import { Injectable } from '@angular/core';

const STORAGE_KEY = 'hirehub_admin_auth';
const HARDCODED_USERNAME = 'admin';
const HARDCODED_PASSWORD = 'admin';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  login(username: string, password: string): { success: boolean; error?: string } {
    if (!username || !password) {
      return { success: false, error: 'Username and password are required' };
    }

    if (username !== HARDCODED_USERNAME || password !== HARDCODED_PASSWORD) {
      return { success: false, error: 'Invalid credentials' };
    }

    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {
      console.error('AdminAuthService: Failed to write to sessionStorage', e);
      return { success: false, error: 'Unable to persist session' };
    }

    return { success: true };
  }

  logout(): void {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('AdminAuthService: Failed to remove sessionStorage key', e);
    }
  }

  isAuthenticated(): boolean {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      console.error('AdminAuthService: Failed to read sessionStorage', e);
      return false;
    }
  }
}