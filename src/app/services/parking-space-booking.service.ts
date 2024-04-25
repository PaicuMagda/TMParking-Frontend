import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParkingSpaceBookingService {
  constructor() {}

  getNumberArray(): Observable<number[]> {
    return of([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24,
    ]);
  }

  getMethodPayment(): string[] {
    return [
      'Payment by the hour',
      'Payment by the day',
      'Negotiation with owner',
    ];
  }

  getNumberOfMonths(): Observable<number[]> {
    return of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  }
}
