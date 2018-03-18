import { Observable } from 'rxjs/Observable';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { CheckConnectionService } from './checkConnection.interceptor';

describe('CheckConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckConnectionService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CheckConnectionService,
          multi: true
        }
      ]
    });
  });

  it('should be created CheckConnectionService', inject([CheckConnectionService], (service: CheckConnectionService) => {
    expect(service).toBeTruthy();
  }));

  it('should be offline', inject([CheckConnectionService], (service: CheckConnectionService) => {
    const next: any = { handle: (request: HttpRequest<any>) => {}};
    const requestMock = new HttpRequest('GET', '/test');

    const navigatorSpy = spyOnProperty<Navigator>(navigator, 'onLine').and.returnValue(false);
    expect(service.intercept(requestMock, next)).toEqual(Observable.throw('Connection Error'));
    expect(navigatorSpy).toHaveBeenCalled();
  }));

  it('should be online', inject([CheckConnectionService], (service: CheckConnectionService) => {
    const next: any = { handle: (request: HttpRequest<any>) => {}};
    const requestMock = new HttpRequest('GET', '/test');

    const navigatorSpy = spyOnProperty<Navigator>(navigator, 'onLine').and.returnValue(true);
    expect(service.intercept(requestMock, next)).toEqual(service.intercept(requestMock, next));
    expect(navigatorSpy).toHaveBeenCalled();
  }));
});
