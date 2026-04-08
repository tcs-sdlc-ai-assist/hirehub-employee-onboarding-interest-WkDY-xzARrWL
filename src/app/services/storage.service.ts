import { Injectable } from '@angular/core';
import { Submission, SubmissionInput, SubmissionUpdate, SubmissionResult, DEPARTMENTS } from '../models/submission.model';

const STORAGE_KEY = 'hirehub_submissions';

@Injectable({ providedIn: 'root' })
export class StorageService {

  getSubmissions(): Submission[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        console.error('StorageService: Data is not an array, resetting storage');
        this.resetStorage();
        return [];
      }
      return parsed as Submission[];
    } catch (e) {
      console.error('StorageService: Failed to parse submissions from localStorage', e);
      this.resetStorage();
      return [];
    }
  }

  addSubmission(input: SubmissionInput): SubmissionResult {
    const validationError = this.validateInput(input);
    if (validationError) {
      return { success: false, error: validationError };
    }

    if (this.isDuplicateEmail(input.email)) {
      return { success: false, error: 'A submission with this email already exists' };
    }

    try {
      const submissions = this.getSubmissions();
      const newSubmission: Submission = {
        id: this.generateId(),
        fullName: input.fullName.trim(),
        email: input.email.trim().toLowerCase(),
        mobile: input.mobile.trim(),
        department: input.department,
        submittedAt: new Date().toISOString(),
      };
      submissions.push(newSubmission);
      this.saveSubmissions(submissions);
      return { success: true };
    } catch (e) {
      console.error('StorageService: Failed to add submission', e);
      return { success: false, error: 'Failed to save submission' };
    }
  }

  updateSubmission(id: string, update: SubmissionUpdate): SubmissionResult {
    if (!id) {
      return { success: false, error: 'Submission ID is required' };
    }

    const updateValidationError = this.validateUpdate(update);
    if (updateValidationError) {
      return { success: false, error: updateValidationError };
    }

    try {
      const submissions = this.getSubmissions();
      const index = submissions.findIndex((s) => s.id === id);
      if (index === -1) {
        return { success: false, error: 'Submission not found' };
      }

      submissions[index] = {
        ...submissions[index],
        fullName: update.fullName.trim(),
        mobile: update.mobile.trim(),
        department: update.department,
      };

      this.saveSubmissions(submissions);
      return { success: true };
    } catch (e) {
      console.error('StorageService: Failed to update submission', e);
      return { success: false, error: 'Failed to update submission' };
    }
  }

  deleteSubmission(id: string): SubmissionResult {
    if (!id) {
      return { success: false, error: 'Submission ID is required' };
    }

    try {
      const submissions = this.getSubmissions();
      const filtered = submissions.filter((s) => s.id !== id);

      if (filtered.length === submissions.length) {
        return { success: false, error: 'Submission not found' };
      }

      this.saveSubmissions(filtered);
      return { success: true };
    } catch (e) {
      console.error('StorageService: Failed to delete submission', e);
      return { success: false, error: 'Failed to delete submission' };
    }
  }

  isDuplicateEmail(email: string, excludeId?: string): boolean {
    if (!email) {
      return false;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const submissions = this.getSubmissions();

    return submissions.some(
      (s) => s.email.toLowerCase() === normalizedEmail && s.id !== excludeId
    );
  }

  resetStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, '[]');
    } catch (e) {
      console.error('StorageService: Failed to reset localStorage', e);
    }
  }

  private saveSubmissions(submissions: Submission[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch (e) {
      console.error('StorageService: Failed to write to localStorage', e);
      throw e;
    }
  }

  private generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomPart}`;
  }

  private validateInput(input: SubmissionInput): string | null {
    if (!input.fullName || !input.fullName.trim()) {
      return 'Full Name is required';
    }
    if (input.fullName.trim().length > 100) {
      return 'Full Name must be at most 100 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(input.fullName.trim())) {
      return 'Full Name must contain only alphabets and spaces';
    }

    if (!input.email || !input.email.trim()) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
      return 'Please enter a valid email address';
    }

    if (!input.mobile || !input.mobile.trim()) {
      return 'Mobile number is required';
    }
    if (!/^\d{10}$/.test(input.mobile.trim())) {
      return 'Mobile number must be exactly 10 digits';
    }

    if (!input.department) {
      return 'Department is required';
    }
    if (!DEPARTMENTS.includes(input.department)) {
      return 'Invalid department selected';
    }

    return null;
  }

  private validateUpdate(update: SubmissionUpdate): string | null {
    if (!update.fullName || !update.fullName.trim()) {
      return 'Full Name is required';
    }
    if (update.fullName.trim().length > 100) {
      return 'Full Name must be at most 100 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(update.fullName.trim())) {
      return 'Full Name must contain only alphabets and spaces';
    }

    if (!update.mobile || !update.mobile.trim()) {
      return 'Mobile number is required';
    }
    if (!/^\d{10}$/.test(update.mobile.trim())) {
      return 'Mobile number must be exactly 10 digits';
    }

    if (!update.department) {
      return 'Department is required';
    }
    if (!DEPARTMENTS.includes(update.department)) {
      return 'Invalid department selected';
    }

    return null;
  }
}