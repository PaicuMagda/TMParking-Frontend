import { Injectable } from '@angular/core';
import { ParkingPlacesService } from '../services/parking-spaces.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ParkingSpace } from '../interfaces/parking-space';

@Injectable({
  providedIn: 'root',
})
export class ParkingSpaceIdResolverService {
  constructor(private parkingSpaces: ParkingPlacesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ParkingSpace[]> {
    const id = route.paramMap.get('id');
    return this.parkingSpaces.getParkingSpacesById(id);
  }
}
