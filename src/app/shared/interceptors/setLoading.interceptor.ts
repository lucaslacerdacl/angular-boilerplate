import { INotificationLoading } from '../notification/interfaces/INotificationLoading';
import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SetLoadingService implements HttpInterceptor {

  constructor(@Inject('INotificationLoading') private _INotificationLoading: INotificationLoading) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('HideLoading')) {
      return next.handle(req);
    } else {
      this._INotificationLoading.openLoading();
      return next.handle(req).pipe(finalize(() => {
        this._INotificationLoading.closeLoading();
      }));
    }
  }
}

