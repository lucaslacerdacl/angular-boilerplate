import { TestBed, inject } from '@angular/core/testing';

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
    const backendCustomException = new ValidationResultModel(true, 'Ocorreu um erro! Preencha todos os campos', null, 400);
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

  // TO DO: Create test about 404

  // TO DO: Create test about 500

  /* TO DO:
   * Create test about another response code verifying the hasError property.
   * Case true return exception containning message.
   * Case false return success with value and message.
   * Think about the enviromnet.
   * Case develop include the exception.
   * Case production exclude the excpetion and handle the message in a better way.
   */
});
