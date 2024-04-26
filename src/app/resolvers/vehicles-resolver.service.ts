import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Injectable({
  providedIn: 'root',
})
export class VehiclesResolverService {
  constructor(private vehiclesService: VehiclesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> {
    return this.vehiclesService.getVehicles();
  }
}
