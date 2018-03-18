import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CheckConnectionService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      return Observable.throw('Connection Error');
    }
    return next.handle(req);
  }
}
