import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { StorageService } from '../../services/storage.service';
import { Submission } from '../../models/submission.model';
import { SubmissionTableComponent } from '../../components/submission-table/submission-table.component';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SubmissionTableComponent, EditModalComponent],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  submissions: Submission[] = [];
  editingSubmission: Submission | null = null;
  stats: { total: number; departments: number; latest: Submission | null } = {
    total: 0,
    departments: 0,
    latest: null
  };

  get isAuthenticated(): boolean {
    return this.adminAuthService.isAuthenticated();
  }

  constructor(
    private adminAuthService: AdminAuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    if (this.isAuthenticated) {
      this.loadSubmissions();
    }
  }

  onLogin(): void {
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Username and password are required.';
      return;
    }

    const { username, password } = this.loginForm.value;
    const result = this.adminAuthService.login(username, password);

    if (!result.success) {
      this.errorMessage = result.error ?? 'Invalid credentials.';
      return;
    }

    this.loginForm.reset();
    this.loadSubmissions();
  }

  onLogout(): void {
    this.adminAuthService.logout();
    this.submissions = [];
    this.editingSubmission = null;
    this.errorMessage = null;
    this.router.navigate(['/']);
  }

  onEdit(submission: Submission): void {
    this.editingSubmission = { ...submission };
  }

  onSave(updatedSubmission: Submission): void {
    const result = this.storageService.updateSubmission(updatedSubmission.id, {
      fullName: updatedSubmission.fullName,
      mobile: updatedSubmission.mobile,
      department: updatedSubmission.department
    });

    if (result.success) {
      this.editingSubmission = null;
      this.loadSubmissions();
    }
  }

  onCancelEdit(): void {
    this.editingSubmission = null;
  }

  onDelete(submission: Submission): void {
    const confirmed = confirm(`Are you sure you want to delete the submission from "${submission.fullName}"?`);
    if (!confirmed) {
      return;
    }

    const result = this.storageService.deleteSubmission(submission.id);
    if (result.success) {
      this.loadSubmissions();
    }
  }

  private loadSubmissions(): void {
    this.submissions = this.storageService.getSubmissions();
    this.computeStats();
  }

  private computeStats(): void {
    const total = this.submissions.length;
    const uniqueDepartments = new Set(this.submissions.map((s) => s.department));
    const departments = uniqueDepartments.size;

    let latest: Submission | null = null;
    if (this.submissions.length > 0) {
      latest = this.submissions.reduce((prev, curr) =>
        new Date(curr.submittedAt) > new Date(prev.submittedAt) ? curr : prev
      );
    }

    this.stats = { total, departments, latest };
  }
}