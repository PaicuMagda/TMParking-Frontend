import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TimisoaraAreas } from '../interfaces/timisoara-areas';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ParkingPlacesService {
  constructor(private http: HttpClient) {}

  baseUrl: string = environment.apiUrl;

  getTimisoaraAreas(): Observable<TimisoaraAreas[]> {
    return this.http.get<TimisoaraAreas[]>(
      `${this.baseUrl + 'TimisoaraAreas'}`
    );
  }

  registerParkingSpaces(newParkingSpaces: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}ParkingSpaces`,
      newParkingSpaces
    );
  }

  getParkingSpaces(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}ParkingSpaces`);
  }

  getMyParkingSpaces(userId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}ParkingSpaces/${userId}/parking-spaces`
    );
  }

  getParkingSpacesById(parkingSpacesId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}ParkingSpaces/${parkingSpacesId}/parkingSpaces`
    );
  }

  deleteParkingSpacesById(parkingSpacesId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}ParkingSpaces/${parkingSpacesId}`);
  }
}
