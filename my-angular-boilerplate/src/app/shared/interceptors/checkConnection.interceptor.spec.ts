import { Observable } from 'rxjs/Observable';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { CheckConnectionService } from './checkConnection.interceptor';
import { ValidationResultModel } from '../http/validationResult.model';

describe('CheckConnectionService', () => {
  let service: CheckConnectionService;
  beforeEach(() => {
    service = new CheckConnectionService();
  });

  it('should be created CheckConnectionService', () => {
    expect(service).toBeTruthy();
  });

  it('should be offline', () => {
    const next: any = { handle: (request: HttpRequest<any>) => {}};
    const requestMock = new HttpRequest('GET', '/test');

    const navigatorSpy = spyOnProperty<Navigator>(navigator, 'onLine').and.returnValue(false);
    const validationResult = new ValidationResultModel();
    validationResult.hasErrors = true;
    validationResult.message = 'Ocorreu um erro de conexão! Verifique se está conectado na internet!';

    const result = service.intercept(requestMock, next);

    expect(result).toEqual(
      Observable.throw(validationResult)
    );
    expect(navigatorSpy).toHaveBeenCalled();
  });

  it('should be online', () => {
    const next: any = { handle: (request: HttpRequest<any>) => {}};
    const requestMock = new HttpRequest('GET', '/test');

    const navigatorSpy = spyOnProperty<Navigator>(navigator, 'onLine').and.returnValue(true);

    const result = service.intercept(requestMock, next);
    expect(result).toEqual(service.intercept(requestMock, next));
    expect(navigatorSpy).toHaveBeenCalled();
  });
});
