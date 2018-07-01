import { HandleExceptionsService } from './handleExceptions.interceptor';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ValidationResultModel } from '../http/validationResult.model';

describe('HandleExceptionsService', () => {
  let service: HandleExceptionsService;
  beforeEach(() => {
    service = new HandleExceptionsService();
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
});
