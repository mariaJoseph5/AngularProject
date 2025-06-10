import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(this.authService.getAuthSecretKey());
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer${token}`
      }
    });
    return next.handle(authRequest).pipe(catchError((error) => {
        console.log("HTTP ERROR:", error);
        return throwError(() => error);
      })
    );
  }
}
