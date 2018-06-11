import { TestBed } from '@angular/core/testing';
import { UnauthorizedResponseService } from './unauthorizedResponse.interceptor';
import { HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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

  it('should call unauthorized route', () => {
      const next: any = { handle: () => ({ catch: (callback: Function) => callback({ status: 401 }) }) };
      const requestMock = new HttpRequest('GET', '/test');
      const cleanLocalStorageSpy = spyOn<Storage>(localStorage, 'clear');

      service.intercept(requestMock, next);

      expect(cleanLocalStorageSpy).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should route with error status code', () => {
    const next: any = { handle: () => ({ catch: (callback: Function) => callback({ status: 404 }) }) };
    const requestMock = new HttpRequest('GET', '/test');

    const interceptorResponse = service.intercept(requestMock, next);

    expect(interceptorResponse).toEqual(
      Observable.throw({ status: 404})
    );
  });

});
