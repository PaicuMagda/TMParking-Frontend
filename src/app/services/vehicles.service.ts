import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  baseUrl: string = environment.apiUrl;

  registerVehicle(newVehicle: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}Vehicle/register-vehicle`,
      newVehicle
    );
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}Vehicle/vehicles`);
  }

  getVehicleById(idUser: any): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(
      `${this.baseUrl}Vehicle/${idUser}/vehicles`
    );
  }

  deletVehicleById(vehicleId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Vehicle/${vehicleId}`);
  }
}
