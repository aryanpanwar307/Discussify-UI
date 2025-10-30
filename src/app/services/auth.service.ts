import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private isAdminUser = false
  private currentUser = new BehaviorSubject<User | null>(null);

  private apiUrl = API_URL + '/auth';
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): any {
    // Simulate login request
    this.http.post(`${this.apiUrl}/login`, { email, password }).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response?.token)

        this.loggedIn.next(true);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }

  hasToken(): boolean {
    return localStorage.getItem('token') ? true : false
  }

  register(username: string, email: string, password: string): any {
    // Simulate registration request
    this.http.post(`${this.apiUrl}/signup`, { username, email, password }).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }

  fetchUserRole(): void {
    this.http.get<any>('http://localhost:3000/api/profile').subscribe({
      next: (response) => {
        console.log(response, 'response' ,  response?.data.isAdmin)
      
      },
      error: (err) => {
        console.error('Failed to fetch user role:', err);
      },
    });
  }

  logout(): void {
    this.loggedIn.next(false);
    this.isAdminUser = false;
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  isAdmin(): boolean {
    return localStorage.getItem('admin') ? true :false
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  getUsername(): any {
    return 'asdfadasdc';
  }
}
