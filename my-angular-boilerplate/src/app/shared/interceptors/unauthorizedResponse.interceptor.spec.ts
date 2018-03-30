import { TestBed, inject } from '@angular/core/testing';

import { UnauthorizedResponseService } from './unauthorizedResponse.interceptor';
import { HTTP_INTERCEPTORS, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('UnauthorizedResponseService', () => {
  const mockRouter = class MockRouter { navigate = jasmine.createSpy('navigate'); };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnauthorizedResponseService,
        {
          provide: Router,
          useClass: mockRouter
        }
      ]
    });
  });

  it('should be created UnauthorizedResponsibleService', inject([UnauthorizedResponseService, Router],
    (service: UnauthorizedResponseService, router: Router) => {
      expect(service).toBeTruthy();
    }));

  it('should be created UnauthorizedResponsibleService', inject([UnauthorizedResponseService, Router],
    (service: UnauthorizedResponseService, router: Router) => {
      const next: any = { handle: (request: HttpRequest<any>) => ({ catch: (callback: Function) => callback({ status: 401 }) }) };
      const requestMock = new HttpRequest('GET', '/test');

      const cleanLocalStorageSpy = spyOn<Storage>(localStorage, 'clear');
      service.intercept(requestMock, next);
      expect(cleanLocalStorageSpy).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));


});
