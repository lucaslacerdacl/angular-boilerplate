import { INotificationLoading } from './../notification/interfaces/INotificationLoading';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SetLoadingService implements HttpInterceptor {

  constructor(@Inject('INotificationLoading') private _INotificationLoading: INotificationLoading) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('HideLoading')) {
      return next.handle(req);
    } else {
      this._INotificationLoading.openLoading();
      return next.handle(req)
      .finally(() => {
        this._INotificationLoading.closeLoading();
      });
    }
  }
}

