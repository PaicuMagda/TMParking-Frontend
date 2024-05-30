import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TimisoaraAreas } from '../interfaces/timisoara-areas';
import { HttpClient } from '@angular/common/http';
import { ParkingLotInterface } from '../interfaces/parking-lot-interface';
import { UserStoreService } from './user-store.service';
import { AuthenticationService } from './authentication.service';
import { ParkingSpace } from '../interfaces/parking-space';

@Injectable({
  providedIn: 'root',
})
export class ParkingPlacesService {
  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
    private authenticationService: AuthenticationService
  ) {
    this.loadParkingSpaces();

    this.userStore.getIdUserFromStore().subscribe((val) => {
      let userIdFromToken = this.authenticationService.getUserIdFromToken();
      this.idUserLogged = val || userIdFromToken;
    });

    this.loadMyParkingSpace(this.idUserLogged);
  }

  idUserLogged: any = '';
  baseUrl: string = environment.apiUrl;

  private updateParkingSpaceSubject = new BehaviorSubject<any>(null);
  dataUpdate$ = this.updateParkingSpaceSubject.asObservable();

  private parkingSpacesSubject = new BehaviorSubject<ParkingSpace[]>([]);
  parkingSpaces$ = this.parkingSpacesSubject.asObservable();

  private myParkingSpaceSubject = new BehaviorSubject<ParkingSpace[]>([]);
  myParkingSpaceSubject$ = this.myParkingSpaceSubject.asObservable();

  private parkingLotsForOneParkingSpaceSubject = new BehaviorSubject<any[]>([]);
  parkingLotsForOneParkingSpace$ =
    this.parkingLotsForOneParkingSpaceSubject.asObservable();

  loadParkingSpaces() {
    this.http
      .get<ParkingSpace[]>(`${this.baseUrl}ParkingSpaces`)
      .subscribe((parkingSpaces) => {
        this.parkingSpacesSubject.next(parkingSpaces);
      });
  }

  loadMyParkingSpace(userId: string) {
    this.http
      .get<ParkingSpace[]>(
        `${this.baseUrl}ParkingSpaces/${userId}/parking-spaces`
      )
      .pipe(
        map((parkingSpaces) =>
          parkingSpaces.map((space) => ({
            ...space,
            dateAdded: new Date(space.dateAdded),
          }))
        )
      )
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

  registerParkingLot(parkingLot: any): Observable<any> {
    return this.http.post<ParkingLotInterface>(
      `${this.baseUrl}OneParkingSpace`,
      parkingLot
    );
  }

  deletePrakingLot(
    parkingLotName: string,
    parkingSpaceId: number
  ): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}OneParkingSpace?parkingSpaceName=${parkingLotName}&parkingSpaceId=${parkingSpaceId}`
    );
  }

  sendUpdatedParkingSpace(updatedParkingSpaces: any[]) {
    this.parkingSpacesSubject.next(updatedParkingSpaces);
  }

  updateParkingSpaces(
    idParkingSpaces: number,
    parkingSpaces: any
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}ParkingSpaces/${idParkingSpaces}`,
      parkingSpaces
    );
  }

  getParkingLotsById(parkingSpaceId: number) {
    this.http
      .get<any[]>(
        `${this.baseUrl}OneParkingSpace/parking-lots?parkingSpacesId=${parkingSpaceId}`
      )
      .subscribe((response) => {
        this.parkingLotsForOneParkingSpaceSubject.next(response);
      });
  }
}
