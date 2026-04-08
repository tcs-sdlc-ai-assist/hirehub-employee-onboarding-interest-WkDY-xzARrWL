import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ValidatorsService } from '../../services/validators.service';
import { DEPARTMENTS } from '../../models/submission.model';

@Component({
  selector: 'app-interest-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './interest-form.component.html',
  styleUrls: ['./interest-form.component.css']
})
export class InterestFormComponent {
  departments = DEPARTMENTS;
  showSuccessBanner = false;
  errorMessage: string | null = null;

  form: FormGroup;

  private successTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private storageService: StorageService,
    private validatorsService: ValidatorsService
  ) {
    this.form = new FormGroup({
      fullName: new FormControl('', this.validatorsService.fullNameValidators()),
      email: new FormControl('', this.validatorsService.emailValidators()),
      mobile: new FormControl('', this.validatorsService.mobileValidators()),
      department: new FormControl('', this.validatorsService.departmentValidators())
    });
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { fullName, email, mobile, department } = this.form.value;

    if (this.storageService.isDuplicateEmail(email)) {
      this.errorMessage = 'A submission with this email already exists.';
      return;
    }

    const result = this.storageService.addSubmission({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      department
    });

    if (!result.success) {
      this.errorMessage = result.error ?? 'Failed to save submission.';
      return;
    }

    this.form.reset({ fullName: '', email: '', mobile: '', department: '' });
    this.showSuccessBanner = true;

    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    this.successTimeout = setTimeout(() => {
      this.showSuccessBanner = false;
      this.successTimeout = null;
    }, 4000);
  }
}