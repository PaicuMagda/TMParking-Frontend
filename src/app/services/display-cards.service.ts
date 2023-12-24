import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayCardsService {
  constructor() {}

  private toggleValueSubject$ = new BehaviorSubject<boolean>(false);
  toggleValueSubjectObservable = this.toggleValueSubject$.asObservable();

  sendToggleValue(value: boolean) {
    this.toggleValueSubject$.next(value);
  }
}
