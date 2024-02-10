import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApi } from '../interfaces/token-api';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private toast: NgToastService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => {
          new Error('Some other error occured.');
        });
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApi = new TokenApi();
    tokenApi.accessToken = this.auth.getToken()!;
    tokenApi.refreshToken = this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokenApi).pipe(
      switchMap((data: TokenApi) => {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` },
        });
        return next.handle(req);
      }),

      catchError((err) => {
        return throwError(() => {
          this.toast.warning({
            detail: 'Warning',
            summary: 'Token is expired, Please login again',
          });
          this.router.navigate(['login']);
        });
      })
    );
  }
}
