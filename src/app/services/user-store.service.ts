import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  private idUser$ = new BehaviorSubject<string>('');

  constructor() {}

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleFromStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }

  public setFullNameFromStore(fullName: string) {
    this.fullName$.next(fullName);
  }

  public getIdUserFromStore() {
    return this.idUser$.asObservable();
  }

  public setIdUserFromStore(idUser: string) {
    this.idUser$.next(idUser);
  }
}
