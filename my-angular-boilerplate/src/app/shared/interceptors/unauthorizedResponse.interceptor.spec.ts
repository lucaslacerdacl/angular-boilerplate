import { TestBed, inject } from '@angular/core/testing';

import { UnauthorizedResponseService } from './unauthorizedResponse.interceptor';
import { HTTP_INTERCEPTORS, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('UnauthorizedResponseService', () => {
  let service: UnauthorizedResponseService;
  let router: Router;

  beforeEach(() => {
    const providers = TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: class MockRouter { navigate = jasmine.createSpy('navigate'); }
        }
      ]
    });
    service = new UnauthorizedResponseService(providers.get(Router));
    router = providers.get(Router);
  });

  it('should be created UnauthorizedResponsibleService', () => {
      expect(service).toBeTruthy();
    });

  it('should be created UnauthorizedResponsibleService', () => {
      const next: any = { handle: (request: HttpRequest<any>) => ({ catch: (callback: Function) => callback({ status: 401 }) }) };
      const requestMock = new HttpRequest('GET', '/test');

      const cleanLocalStorageSpy = spyOn<Storage>(localStorage, 'clear');
      service.intercept(requestMock, next);
      expect(cleanLocalStorageSpy).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

});
