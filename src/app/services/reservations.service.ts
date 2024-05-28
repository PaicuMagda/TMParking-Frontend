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

  private myReservationsSubject = new BehaviorSubject<Reservation[]>([]);
  myReservations$ = this.myReservationsSubject.asObservable();

  private reservationsForOneParkingSubject = new BehaviorSubject<Reservation[]>(
    []
  );
  reservationsForOneParking$ =
    this.reservationsForOneParkingSubject.asObservable();

  registerReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Reservation`, reservation);
  }

  getReservationsByUserId(userId: number) {
    this.http
      .get<Reservation[]>(`${this.baseUrl}Reservation/${userId}/reservations`)
      .subscribe((values) => this.myReservationsSubject.next(values));
  }

  deleteReservation(idReservation: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}Reservation?reservationId=${idReservation}`
    );
  }

  getReservationsByLotId(parkingLotId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}Reservation/reservations/${parkingLotId}`
    );
  }

  getReservationsByParkingId(parkingSpaceId: number) {
    this.http
      .get<Reservation[]>(
        `${this.baseUrl}Reservation/${parkingSpaceId}/reservationsForABigParkingSpace`
      )
      .subscribe((values) =>
        this.reservationsForOneParkingSubject.next(values)
      );
  }

  loadReservations() {
    this.http
      .get<Reservation[]>(`${this.baseUrl}Reservation`)
      .subscribe((values) => this.reservationSubject.next(values));
  }
}
