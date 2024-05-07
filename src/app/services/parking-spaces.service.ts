import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TimisoaraAreas } from '../interfaces/timisoara-areas';
import { HttpClient } from '@angular/common/http';
import { ParkingLotInterface } from '../interfaces/parking-lot-interface';

@Injectable({
  providedIn: 'root',
})
export class ParkingPlacesService {
  constructor(private http: HttpClient) {
    this.loadParkingSpaces();
  }

  baseUrl: string = environment.apiUrl;
  private parkingSpacesSubject = new BehaviorSubject<any[]>([]);
  parkingSpaces$ = this.parkingSpacesSubject.asObservable();

  private myParkingSpaceSubject = new BehaviorSubject<any[]>([]);
  myParkingSpaceSubject$ = this.myParkingSpaceSubject.asObservable();

  loadParkingSpaces() {
    this.http
      .get<any>(`${this.baseUrl}ParkingSpaces`)
      .subscribe((parkingSpaces) => {
        this.parkingSpacesSubject.next(parkingSpaces);
      });
  }

  loadMyParkingSpace(userId: string) {
    this.http
      .get<any[]>(`${this.baseUrl}ParkingSpaces/${userId}/parking-spaces`)
      .subscribe((myParkingSpaces) => {
        this.myParkingSpaceSubject.next(myParkingSpaces);
      });
  }

  getTimisoaraAreas(): Observable<TimisoaraAreas[]> {
    return this.http.get<TimisoaraAreas[]>(
      `${this.baseUrl + 'TimisoaraAreas'}`
    );
  }

  registerParkingSpaces(newParkingSpaces: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}ParkingSpaces`, newParkingSpaces)
      .pipe(
        tap((newParkingSpace) => {
          const currentParkingSpaces = this.parkingSpacesSubject.getValue();
          currentParkingSpaces.push(newParkingSpace);
          this.parkingSpacesSubject.next(currentParkingSpaces);
        })
      );
  }

  getParkingSpaces(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}ParkingSpaces`);
  }

  getMyParkingSpaces(userId: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}ParkingSpaces/${userId}/parking-spaces`
    );
  }

  getParkingSpacesById(parkingSpacesId: any): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}ParkingSpaces/${parkingSpacesId}/parkingSpaces`
    );
  }

  deleteParkingSpacesById(parkingSpacesId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}ParkingSpaces/${parkingSpacesId}`);
  }

  registerParkingLot(
    parkingLot: ParkingLotInterface
  ): Observable<ParkingLotInterface> {
    return this.http.post<ParkingLotInterface>(
      `${this.baseUrl}OneParkingSpace`,
      parkingLot
    );
  }

  updateParkingSpaces(
    idParkingSpaces: number,
    parkingSpaces: any
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}ParkingSpaces/update-parking-spaces/${idParkingSpaces}`,
      parkingSpaces
    );
  }

  getParkingLotById(parkingSpaceId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}OneParkingSpace/parking-lots?parkingSpacesId=${parkingSpaceId}`
    );
  }
}
