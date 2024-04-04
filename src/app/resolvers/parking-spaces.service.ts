import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ParkingSpace } from 'src/app/interfaces/parking-space';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';

@Injectable({
  providedIn: 'root',
})
export class ParkingSpacesService {
  constructor(private parkingSpaces: ParkingPlacesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ParkingSpace[]> {
    return this.parkingSpaces.getParkingSpaces();
  }
}
