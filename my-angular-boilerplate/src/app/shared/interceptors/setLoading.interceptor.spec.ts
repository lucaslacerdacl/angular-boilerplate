import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TestBed, inject } from '@angular/core/testing';

import { SetLoadingService } from './setLoading.interceptor';
import { HTTP_INTERCEPTORS, HttpRequest, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../notification/implementations/swal/notification.swal.service';
import { INotificationLoading } from '../notification/interfaces/INotificationLoading';

describe('SetLoadingService', () => {
  let notification: NotificationService;
  let service: SetLoadingService;
  beforeEach(() => {
    notification = new NotificationService();
    service = new SetLoadingService(notification);
  });

  it('should be created SetLoadingService', () => {
    expect(service).toBeTruthy();
  });

  it('should be hide loading', () => {
    const next: any = { handle: (request: HttpRequest<any>) => {}};
    const requestMock = new HttpRequest('GET', '/test', { headers: new HttpHeaders().append('HideLoading', 'true') });
    expect(service.intercept(requestMock, next)).toEqual(service.intercept(requestMock, next));
  });

  it('should be show loading', () => {
    const next: any = {
      handle: (request: HttpRequest<any>) => ({
        finally: (callback: Function) => callback()})
    };
    const requestMock = new HttpRequest('GET', '/test');

    const openLoadingSpy = spyOn<INotificationLoading>(notification, 'openLoading');
    const closeLoadingSpy = spyOn<INotificationLoading>(notification, 'closeLoading');
    service.intercept(requestMock, next);
    expect(openLoadingSpy).toHaveBeenCalled();
    expect(closeLoadingSpy).toHaveBeenCalled();
  });
});
