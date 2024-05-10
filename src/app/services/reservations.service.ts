import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor(private http: HttpClient) {}

  baseUrl: string = environment.apiUrl;

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}Reservation`);
  }

  registerReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Reservation`, reservation);
  }

  getReservationsByUserId(userId: number): Observable<any> {
    return this.http.get<any[]>(
      `${this.baseUrl}Reservation/${userId}/reservations`
    );
  }
}
