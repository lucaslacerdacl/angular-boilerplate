import { Observable } from 'rxjs/Observable';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { CheckConnectionService } from './checkConnection.interceptor';
import { ValidationResultModel } from '../../services/validationResult.model';

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
    const validationResult = new ValidationResultModel();
    validationResult.hasErrors = true;
    validationResult.message = 'Ocorreu um erro de conexão! Verifique se está conectado na internet!';
    expect(service.intercept(requestMock, next)).toEqual(
      Observable.throw(validationResult)
    );
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
