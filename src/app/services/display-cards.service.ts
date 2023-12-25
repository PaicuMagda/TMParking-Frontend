import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayCardsService {
  constructor() {}

  private toggleValueSubject$ = new BehaviorSubject<string>('allParkingSpaces');
  toggleValueSubjectObservable = this.toggleValueSubject$.asObservable();

  sendToggleValue(value: string) {
    this.toggleValueSubject$.next(value);
  }
}
