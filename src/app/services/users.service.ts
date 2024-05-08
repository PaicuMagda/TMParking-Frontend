import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
      .get<any[]>(`${this.baseUrl}User/admin-page`)
      .subscribe((vehicles) => this.usersSubject.next(vehicles));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}User`);
  }

  getUsersForAdminPage(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}User/admin-page`);
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

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}User/${userId}`);
  }
}
