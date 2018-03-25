import { INotificationLoading } from './../notification/interfaces/INotificationLoading';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { NotificationSwalService } from '../notification/implementations/notification.swal.service';
@Injectable()
export class SetLoadingService implements HttpInterceptor {

  constructor(private notificationSwalService: NotificationSwalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('HideLoading')) {
      return next.handle(req);
    } else {
      this.notificationSwalService.openLoading();
      return next.handle(req)
      .finally(() => {
        this.notificationSwalService.closeLoading();
      });
    }
  }
}

