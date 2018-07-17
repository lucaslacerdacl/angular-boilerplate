import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ValidationResultModel } from '../http/validationResult.model';
import { ITranslationService } from '../i18n/service/interfaces/ITranslationService';
import { TranslationPathEnum } from '../i18n/resources/translationPath.enum';
import { TranslationLocaleEnum } from '../i18n/resources/translationLocale.enum';

@Injectable()
export class HandleExceptionsService implements HttpInterceptor {

  constructor(@Inject('ITranslationService') private _ITranslationService: ITranslationService) { }

  private handleExceptionByStatusCode(response: HttpErrorResponse): ValidationResultModel<any> {
    if (response.status >= 500) {
        // tslint:disable-next-line:max-line-length
        const message = this._ITranslationService.getResource(TranslationPathEnum.interceptorsHandleExceptions, 'UnexpectedError', TranslationLocaleEnum.enUS);
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
    // tslint:disable-next-line:max-line-length
    return message ? message : this._ITranslationService.getResource(TranslationPathEnum.interceptorsHandleExceptions, 'PleaseContactUs', TranslationLocaleEnum.enUS);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error: HttpErrorResponse) => {
        const formatedExceptionResponse = this.handleExceptionByStatusCode(error);
        return Observable.throw(formatedExceptionResponse);
      });
  }
}
