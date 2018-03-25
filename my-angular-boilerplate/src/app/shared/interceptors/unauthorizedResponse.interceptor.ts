import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class UnauthorizedResponseService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .catch((err: HttpErrorResponse) => {
      if (err.status === 401) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
      return Observable.throw(err);
    });
  }
}

