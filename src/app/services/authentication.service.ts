import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl: string = 'https://localhost:7010/api/User';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, user);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
