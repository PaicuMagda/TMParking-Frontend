import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { UserStoreService } from './user-store.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
    private authenticationService: AuthenticationService
  ) {
    this.loadVehicles();
    this.userStore.getIdUserFromStore().subscribe((val) => {
      let userIdFromToken = this.authenticationService.getUserIdFromToken();
      this.idUserLogged = val || userIdFromToken;
    });
    this.loadMyVehicles(this.idUserLogged);
  }

  baseUrl: string = environment.apiUrl;
  idUserLogged: any = '';

  private vehiclesSubject = new BehaviorSubject<any[]>([]);
  vehicles$ = this.vehiclesSubject.asObservable();

  private myVehiclesSubject = new BehaviorSubject<any[]>([]);
  myVehicles$ = this.myVehiclesSubject.asObservable();

  loadVehicles() {
    this.http
      .get<Vehicle[]>(`${this.baseUrl}Vehicle/vehicles`)
      .subscribe((vehicles) => this.vehiclesSubject.next(vehicles));
  }

  loadMyVehicles(idUser: any) {
    this.http
      .get<Vehicle[]>(`${this.baseUrl}Vehicle/${idUser}/vehicles`)
      .subscribe((vehicles) => this.myVehiclesSubject.next(vehicles));
  }

  registerVehicle(newVehicle: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}Vehicle/register-vehicle`, newVehicle)
      .pipe(
        tap((newVehicle) => {
          const currentVehicles = this.vehiclesSubject.getValue();
          currentVehicles.push(newVehicle);
          this.vehiclesSubject.next(currentVehicles);
        })
      );
  }

  registerMyVehicle(newVehicle: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}Vehicle/register-vehicle`, newVehicle)
      .pipe(
        tap((newVehicle) => {
          const currentVehicles = this.myVehiclesSubject.getValue();
          currentVehicles.push(newVehicle);
          this.myVehiclesSubject.next(currentVehicles);
        })
      );
  }

  getVehiclesForTables(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}Vehicle/vehicles-tables`);
  }
  updateVehicles(vehicles: Vehicle[]) {
    this.vehiclesSubject.next(vehicles);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}Vehicle/vehicles`);
  }

  getVehicleByUserId(idUser: any): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(
      `${this.baseUrl}Vehicle/${idUser}/vehicles`
    );
  }

  getVehicleById(idVehicle: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}Vehicle/${idVehicle}`);
  }

  deletVehicleById(vehicleId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Vehicle/${vehicleId}`);
  }

  updateVehicle(idVehicle: number, vehicle: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}Vehicle/${idVehicle}`, vehicle);
  }
}
