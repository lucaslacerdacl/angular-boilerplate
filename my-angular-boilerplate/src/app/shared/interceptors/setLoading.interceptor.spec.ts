import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TestBed, inject } from '@angular/core/testing';

import { SetLoadingService } from './setLoading.interceptor';
import { HTTP_INTERCEPTORS, HttpRequest, HttpHeaders } from '@angular/common/http';

describe('SetLoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetLoadingService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SetLoadingService,
          multi: true
        }
      ]
    });
  });

  it('should be created SetLoadingService', inject([SetLoadingService], (service: SetLoadingService) => {
    expect(service).toBeTruthy();
  }));

  it('should be hide loading', inject([SetLoadingService], (service: SetLoadingService) => {
    const next: any = { handle: (request: HttpRequest<any>) => {}};
    const requestMock = new HttpRequest('GET', '/test', { headers: new HttpHeaders().append('HideLoading', 'true') });

    const navigatorSpy = spyOnProperty<Navigator>(navigator, 'onLine').and.returnValue(true);
    const showLoadingSpy = spyOn<Console>(console, 'error');
    service.intercept(requestMock, next);
    expect(navigatorSpy).toHaveBeenCalled();
    expect(showLoadingSpy).toHaveBeenCalled();
  }));

  it('should be show loading', inject([SetLoadingService], (service: SetLoadingService) => {
    const next: any = {
      handle: (request: HttpRequest<any>) => ({
        finally: (callback: Function) => callback()})
    };
    const requestMock = new HttpRequest('GET', '/test');

    const navigatorSpy = spyOnProperty<Navigator>(navigator, 'onLine').and.returnValue(true);
    const showLoadingSpy = spyOn<Console>(console, 'log');
    service.intercept(requestMock, next);
    expect(navigatorSpy).toHaveBeenCalled();
    expect(showLoadingSpy).toHaveBeenCalledTimes(2);
  }));

  it('should be offline', inject([SetLoadingService], (service: SetLoadingService) => {
    const next: any = { handle: (request: HttpRequest<any>) => {}};
    const requestMock = new HttpRequest('GET', '/test');

    const navigatorSpy = spyOnProperty<Navigator>(navigator, 'onLine').and.returnValue(false);
    expect(service.intercept(requestMock, next)).toEqual(Observable.throw('Connection Error'));
  }));
});
