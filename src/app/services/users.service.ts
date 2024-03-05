import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Role } from '../enums/roles';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = 'https://localhost:7010/User';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update-user/${id}`, user);
  }
}
