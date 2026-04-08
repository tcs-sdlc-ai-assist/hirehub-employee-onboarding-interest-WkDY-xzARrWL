import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Submission, DEPARTMENTS } from '../../models/submission.model';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  @Input() submission!: Submission;
  @Output() save = new EventEmitter<Submission>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  errorMessage: string | null = null;
  departments: readonly string[] = DEPARTMENTS;

  ngOnInit(): void {
    this.form = new FormGroup({
      fullName: new FormControl(this.submission.fullName, [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]),
      email: new FormControl({ value: this.submission.email, disabled: true }),
      mobile: new FormControl(this.submission.mobile, [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]),
      department: new FormControl(this.submission.department, [
        Validators.required
      ])
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = null;

    const updatedSubmission: Submission = {
      ...this.submission,
      fullName: this.form.get('fullName')!.value.trim(),
      mobile: this.form.get('mobile')!.value.trim(),
      department: this.form.get('department')!.value
    };

    this.save.emit(updatedSubmission);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onCancel();
    }
  }
}