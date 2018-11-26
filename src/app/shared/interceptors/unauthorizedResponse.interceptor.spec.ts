
import { throwError as observableThrowError, Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { UnauthorizedResponseService } from './unauthorizedResponse.interceptor';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

describe('UnauthorizedResponseService', () => {
  let service: UnauthorizedResponseService;
  let router: Router;
  let cleanLocalStorageSpy: jasmine.Spy;
  beforeEach(() => {
    const providers = TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: class MockRouter { navigate = jasmine.createSpy('navigate'); }
        }
      ]
    });
    cleanLocalStorageSpy = spyOn<Storage>(localStorage, 'clear');
    service = new UnauthorizedResponseService(providers.get(Router));
    router = providers.get(Router);
  });

  it('should be created UnauthorizedResponsibleService', () => {
    expect(service).toBeTruthy();
  });

  it('should call unauthorized route', () => {
    const next: any = {
      handle: () => {
        return Observable.create((subscriber) => {
          subscriber.error({ status: 401 });
        });
      }
    };

    const requestMock = new HttpRequest('GET', '/test');

    service.intercept(requestMock, next).subscribe({
      error(err) {
        expect(cleanLocalStorageSpy).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(err).toEqual({ status: 401 });
      }
    });
  });

  it('should call unauthenticated route', () => {
    const next: any = {
      handle: () => {
        return Observable.create((subscriber) => {
          subscriber.error({ status: 403 });
        });
      }
    };
    const requestMock = new HttpRequest('GET', '/test');

    service.intercept(requestMock, next).subscribe({
      error(err) {
        expect(cleanLocalStorageSpy).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(err).toEqual({ status: 403 });
      }
    });
  });

  it('should route with error status code', () => {
    const next: any = {
      handle: () => {
        return Observable.create((subscriber) => {
          subscriber.error({ status: 404 });
        });
      }
    };
    const requestMock = new HttpRequest('GET', '/test');

    service.intercept(requestMock, next);

    service.intercept(requestMock, next).subscribe({
      error(err) {
        expect(err).toEqual({ status: 404 });
      }
    });
  });

  it('should call unauthorized route but with interceptor disabled', () => {
    const next: any = { handle: () => ({}) };
    const requestMock = new HttpRequest('GET', '/test', { headers: new HttpHeaders({'DisableUnauthorizedInterceptor': 'true' }) });

    service.intercept(requestMock, next);

    expect(cleanLocalStorageSpy).toHaveBeenCalledTimes(0);
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });

});
