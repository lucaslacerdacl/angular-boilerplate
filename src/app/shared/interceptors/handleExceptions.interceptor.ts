import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ValidationResultModel } from '../http/validationResult.model';

@Injectable()
export class HandleExceptionsService implements HttpInterceptor {

  constructor() { }

  private handleExceptionByStatusCode(response: HttpErrorResponse): ValidationResultModel<any> {
    if (response.status >= 500) {
        return new ValidationResultModel<any>('Unexpected error', null, 500);
    } else {
        return this.formatedExceptionResponse(response);
    }
  }

  private formatedExceptionResponse(response: HttpErrorResponse): ValidationResultModel<any> {
    const validationResultError = new ValidationResultModel<any>();
    validationResultError.statusCode = response.status;
    if (response.error) {
      validationResultError.message = this.formatMessage(response.error.message);
      validationResultError.value = response.error.value;
    } else {
      validationResultError.message = this.formatMessage();
      validationResultError.value = null;
    }
    return validationResultError;
  }

  private formatMessage(message?: string): string {
    return message ? message : 'Please contact us';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error: HttpErrorResponse) => {
        const formatedExceptionResponse = this.handleExceptionByStatusCode(error);
        return Observable.throw(formatedExceptionResponse);
      });
  }
}
