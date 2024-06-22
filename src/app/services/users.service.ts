import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  loadUsers() {
    this.http
      .get<User[]>(`${this.baseUrl}User/admin-page`)
      .subscribe((users) => this.usersSubject.next(users));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}User/admin-page`);
  }

  getUsersForCharts(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}User/charts`);
  }

  getUsersForTables(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}User/users-table`);
  }

  registerNewUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}User/register`, user).pipe(
      tap((user) => {
        const currentUsers = this.usersSubject.getValue();
        currentUsers.push(user);
        this.usersSubject.next(currentUsers);
      })
    );
  }

  getMyAccount(userId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}User/${userId}/user-account`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}User/update-user/${id}`, user);
  }

  updateMyAccount(id: number, user: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}User/update-my-account/${id}`,
      user
    );
  }

  updateUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}User/${userId}`);
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    const body = {
      email,
      newPassword,
    };
    return this.http.post(
      `${this.baseUrl}User/update-password?email=${email}&password=${newPassword}`,
      body
    );
  }
}
