
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';

import { ValidationResultModel } from '../http/validationResult.model';
import { ITranslationService } from '../i18n/service/interfaces/ITranslationService';
import { TranslationPathEnum } from '../i18n/resources/translationPath.enum';
import { TranslationLocaleEnum } from '../i18n/resources/translationLocale.enum';

@Injectable()
export class HandleExceptionsService implements HttpInterceptor {

  constructor(@Inject('ITranslationService') private _ITranslationService: ITranslationService) { }

  private handleExceptionByStatusCode(response: HttpErrorResponse): ValidationResultModel<any> {
    if (response.status >= 500) {
      const translationPath = TranslationPathEnum.interceptorsHandleExceptions;
      const message = this._ITranslationService.getResource(translationPath, 'UnexpectedError', TranslationLocaleEnum.enUS);
      return new ValidationResultModel<any>(message, null, 500);
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
    const translationPath = TranslationPathEnum.interceptorsHandleExceptions;
    return message ? message : this._ITranslationService.getResource(translationPath, 'PleaseContactUs', TranslationLocaleEnum.enUS);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      const formatedExceptionResponse = this.handleExceptionByStatusCode(error);
      return observableThrowError(formatedExceptionResponse);
    }));
  }
}
