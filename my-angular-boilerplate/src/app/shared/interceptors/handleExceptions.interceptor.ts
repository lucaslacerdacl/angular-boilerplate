import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ValidationResultModel } from '../http/validationResult.model';

@Injectable()
export class HandleExceptionsService implements HttpInterceptor {

  constructor() { }

  private formatedExceptionResponse(error: HttpErrorResponse): ValidationResultModel<any> {
    const validationResultError = new ValidationResultModel<any>(true);
    validationResultError.message = this.formatMessage(error.error.message);
    validationResultError.value = error.error.value;
    validationResultError.statusCode = error.status;
    return validationResultError;
  }

  private formatMessage(message: string): string {
    return message ? message : 'Please contact us';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch(error => {
        const formatedExceptionResponse = this.formatedExceptionResponse(error);
        return Observable.throw(formatedExceptionResponse);
      });
  }
}
