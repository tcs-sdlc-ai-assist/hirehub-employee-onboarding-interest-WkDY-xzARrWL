import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { DEPARTMENTS } from '../models/submission.model';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  validateFullName(name: string): string | null {
    if (!name || name.trim().length === 0) {
      return 'Full Name is required.';
    }
    if (name.length > 100) {
      return 'Full Name must be at most 100 characters.';
    }
    const pattern = /^[a-zA-Z\s]+$/;
    if (!pattern.test(name)) {
      return 'Full Name must contain only alphabets and spaces.';
    }
    return null;
  }

  validateEmail(email: string): string | null {
    if (!email || email.trim().length === 0) {
      return 'Email is required.';
    }
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  }

  validateMobile(mobile: string): string | null {
    if (!mobile || mobile.trim().length === 0) {
      return 'Mobile number is required.';
    }
    const pattern = /^\d{10}$/;
    if (!pattern.test(mobile)) {
      return 'Mobile number must be exactly 10 digits.';
    }
    return null;
  }

  validateDepartment(dept: string): string | null {
    if (!dept || dept.trim().length === 0) {
      return 'Department is required.';
    }
    if (!DEPARTMENTS.includes(dept)) {
      return 'Please select a valid department.';
    }
    return null;
  }

  fullNameValidators(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(/^[a-zA-Z\s]+$/)
    ];
  }

  emailValidators(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.email
    ];
  }

  mobileValidators(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ];
  }

  departmentValidators(): ValidatorFn[] {
    return [
      Validators.required,
      this.departmentListValidator()
    ];
  }

  private departmentListValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      if (!DEPARTMENTS.includes(control.value)) {
        return { invalidDepartment: true };
      }
      return null;
    };
  }
}