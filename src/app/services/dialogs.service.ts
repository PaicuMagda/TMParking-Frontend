import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor() {}

  private saveChanges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public saveChanges$: Observable<boolean> = this.saveChanges.asObservable();

  sendSaveChangesResponse(response: boolean) {
    this.saveChanges.next(response);
  }
}
