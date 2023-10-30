import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
