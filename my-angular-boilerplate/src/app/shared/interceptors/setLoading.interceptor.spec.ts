import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TestBed, inject } from '@angular/core/testing';

import { SetLoadingService } from './setLoading.interceptor';
import { HTTP_INTERCEPTORS, HttpRequest, HttpHeaders } from '@angular/common/http';
import { NotificationSwalService } from '../notification/implementations/notification.swal.service';

describe('SetLoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SetLoadingService,
        NotificationSwalService
      ]
    });
  });

  it('should be created SetLoadingService', inject([SetLoadingService, NotificationSwalService],
    (service: SetLoadingService, notification: NotificationSwalService) => {
    expect(service).toBeTruthy();
  }));

  it('should be hide loading', inject([SetLoadingService, NotificationSwalService],
    (service: SetLoadingService, notification: NotificationSwalService) => {
    const next: any = { handle: (request: HttpRequest<any>) => {}};
    const requestMock = new HttpRequest('GET', '/test', { headers: new HttpHeaders().append('HideLoading', 'true') });
    expect(service.intercept(requestMock, next)).toEqual(service.intercept(requestMock, next));
  }));

  it('should be show loading', inject([SetLoadingService, NotificationSwalService],
    (service: SetLoadingService, notification: NotificationSwalService) => {
    const next: any = {
      handle: (request: HttpRequest<any>) => ({
        finally: (callback: Function) => callback()})
    };
    const requestMock = new HttpRequest('GET', '/test');

    const openLoadingSpy = spyOn<NotificationSwalService>(notification, 'openLoading');
    const closeLoadingSpy = spyOn<NotificationSwalService>(notification, 'closeLoading');
    service.intercept(requestMock, next);
    expect(openLoadingSpy).toHaveBeenCalled();
    expect(closeLoadingSpy).toHaveBeenCalled();
  }));
});
