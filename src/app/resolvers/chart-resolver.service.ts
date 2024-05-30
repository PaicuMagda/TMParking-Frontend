import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class ChartResolverService {
  constructor(private usersService: UsersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this.usersService.getUsersForCharts();
  }
}
