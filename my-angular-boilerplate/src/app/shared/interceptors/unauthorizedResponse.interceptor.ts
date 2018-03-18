import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UnauthorizedResponseService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .catch((err: HttpErrorResponse) => {
      if (err.status === 401) {
        localStorage.clear();
        console.error('Redirecionando por falta de autorização');
      }
      return Observable.throw(err);
    });
  }
}

