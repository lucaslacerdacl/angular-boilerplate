import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class SetLoadingService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (navigator.onLine) {
      if (req.headers.has('HideLoading')) {
        console.error('HideLoading');
        return next.handle(req);
      } else {
        console.log('ShowLoading');
        return next.handle(req)
        .finally(() => {
          console.log('CloseLoading');
        });
      }
    } else {
      return Observable.throw('Connection Error');
    }
  }

}
