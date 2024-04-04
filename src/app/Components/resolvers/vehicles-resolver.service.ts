import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Injectable({
  providedIn: 'root',
})
export class VehiclesResolverService {
  constructor(private vehiclesService: VehiclesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Vehicle[]> {
    return this.vehiclesService.getAllVehicles();
  }
}
