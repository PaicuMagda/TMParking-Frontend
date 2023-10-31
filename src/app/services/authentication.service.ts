import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl: string = 'https://localhost:7010/api/User';
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

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

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }

  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
}
