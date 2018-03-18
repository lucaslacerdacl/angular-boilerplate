import { TestBed, inject } from '@angular/core/testing';

import { UnauthorizedResponseService } from './unauthorizedResponse.interceptor';
import { HTTP_INTERCEPTORS, HttpRequest, HttpHeaders } from '@angular/common/http';

describe('UnauthorizedResponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthorizedResponseService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UnauthorizedResponseService,
          multi: true
        }
      ]
    });
  });

  it('should be created UnauthorizedResponsibleService', inject([UnauthorizedResponseService], (service: UnauthorizedResponseService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created UnauthorizedResponsibleService', inject([UnauthorizedResponseService], (service: UnauthorizedResponseService) => {
    const next: any = { handle: (request: HttpRequest<any>) => ({ catch: (callback: Function) => callback({ status: 401 }) }) };
    const requestMock = new HttpRequest('GET', '/test');

    const cleanLocalStorageSpy = spyOn<Storage>(localStorage, 'clear');
    const showLoadingSpy = spyOn<Console>(console, 'error');
    service.intercept(requestMock, next);
    expect(cleanLocalStorageSpy).toHaveBeenCalled();
    expect(showLoadingSpy).toHaveBeenCalled();
  }));


});
