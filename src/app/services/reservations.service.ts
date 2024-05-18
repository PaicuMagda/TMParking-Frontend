import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor(private http: HttpClient) {
    this.loadReservations();
  }

  baseUrl: string = environment.apiUrl;

  private reservationSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this.reservationSubject.asObservable();

  registerReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Reservation`, reservation);
  }

  getReservationsByUserId(userId: number): Observable<any> {
    return this.http.get<any[]>(
      `${this.baseUrl}Reservation/${userId}/reservations`
    );
  }

  deleteReservation(idReservation: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}Reservation?reservationId=${idReservation}`
    );
  }

  loadReservations() {
    this.http
      .get<Reservation[]>(`${this.baseUrl}Reservation`)
      .subscribe((values) => this.reservationSubject.next(values));
  }
}
