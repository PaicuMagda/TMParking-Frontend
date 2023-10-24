import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl: string = 'https://localhost:7010/api/User';

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, user);
  }

  getAllUsers() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
