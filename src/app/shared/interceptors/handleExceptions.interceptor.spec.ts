import { HandleExceptionsService } from './handleExceptions.interceptor';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ValidationResultModel } from '../http/validationResult.model';
import { LocalStorageService } from '../storage/implementations/localStorage/localStorage.service';
import { TranslationService } from '../i18n/service/implementations/translation.service';
import { TranslationPathEnum } from '../i18n/resources/translationPath.enum';
import { TranslationLocaleEnum } from '../i18n/resources/translationLocale.enum';

describe('HandleExceptionsService', () => {
  let service: HandleExceptionsService;
  let translationService: TranslationService;
  let localStorageService: LocalStorageService;
  beforeEach(() => {
    localStorageService = new LocalStorageService();
    translationService = new TranslationService(localStorageService);
    service = new HandleExceptionsService(translationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be in catch, response status 400 (Bad Request)', () => {
    const backendCustomException = new ValidationResultModel('Please fill all fields.', null, 400);
    const httpError = new HttpErrorResponse({
      error: backendCustomException,
      status: 400
    });
    const next: any = {
      handle: () => ({
        catch: (callback: Function) => callback(httpError)
      })
    };
    const requestMock = new HttpRequest('GET', '/test');

    service.intercept(requestMock, next).toPromise()
      .catch(error => {
        expect(error).toEqual(backendCustomException);
      });

  });

  it('should be in catch, response status 500 (Internal Server Error)', () => {
    const httpError = new HttpErrorResponse({
      status: 500
    });
    const next: any = {
      handle: () => ({
        catch: (callback: Function) => callback(httpError)
      })
    };
    const requestMock = new HttpRequest('GET', '/test');

    service.intercept(requestMock, next).toPromise()
      .catch(error => {
        expect(error).toEqual(new ValidationResultModel('Unexpected error', null, 500));
      });
  });

  it('should be in catch, response status 404 (Not Found)', () => {
    const httpError = new HttpErrorResponse({
      status: 404
    });
    const next: any = {
      handle: () => ({
        catch: (callback: Function) => callback(httpError)
      })
    };
    const requestMock = new HttpRequest('GET', '/test');

    service.intercept(requestMock, next).toPromise()
      .catch(error => {
        expect(error).toEqual(new ValidationResultModel('Please contact us', null, 404));
      });
  });
});
