import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor() {}

  private dialogSubject = new Subject<boolean>();
  dialogState$ = this.dialogSubject.asObservable();

  openDialog() {
    this.dialogSubject.next(true);
  }

  closeDialog() {
    this.dialogSubject.next(false);
  }
}
