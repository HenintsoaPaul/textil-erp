import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = signal<User | null>(null);
  
  currentUser = computed(() => this._currentUser());
  isAuthenticated = computed(() => !!this._currentUser());

  constructor(private router: Router) {
    // Check if user is already logged in (mock persistence)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this._currentUser.set(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): boolean {
    // Mock login logic
    if (username === 'admin' && password === 'admin') {
      const user: User = {
        id: '1',
        username: 'admin',
        email: 'admin@textil.com',
        role: 'admin'
      };
      
      this._currentUser.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    this._currentUser.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
