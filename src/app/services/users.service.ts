import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}User`);
  }

  registerNewUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}User/register`, user);
  }

  getMyAccount(userId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}User/${userId}/user-account`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}User/update-user/${id}`, user);
  }
}
