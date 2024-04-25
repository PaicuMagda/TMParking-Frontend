import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {
    this.loadVehicles();
  }

  baseUrl: string = environment.apiUrl;
  private vehiclesSubject = new BehaviorSubject<any[]>([]);
  vehicles$ = this.vehiclesSubject.asObservable();

  loadVehicles() {
    this.http
      .get<Vehicle[]>(`${this.baseUrl}Vehicle/vehicles`)
      .subscribe((vehicles) => this.vehiclesSubject.next(vehicles));
  }

  registerVehicle(newVehicle: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}Vehicle/register-vehicle`, newVehicle)
      .pipe(
        tap((newVehicle) => {
          const currentVehicles = this.vehiclesSubject.getValue();
          currentVehicles.push(newVehicle);
          this.vehiclesSubject.next(currentVehicles);
          console.log(currentVehicles);
        })
      );
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
    return this.http.put<any>(
      `${this.baseUrl}Vehicle/update-vehicle/${idVehicle}`,
      vehicle
    );
  }
}
