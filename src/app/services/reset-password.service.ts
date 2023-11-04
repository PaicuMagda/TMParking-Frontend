import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../interfaces/ResetPassword';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private baseUrl: string = 'https://localhost:7010/api/User';

  constructor(private http: HttpClient) {}

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.baseUrl}/send-email/${email}`, {});
  }

  resetPassword(resetPassword: ResetPassword) {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, resetPassword);
  }
}
