
import { throwError as observableThrowError, Observable } from 'rxjs';
import { ValidationResultModel } from '../http/validationResult.model';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { ITranslationService } from '../i18n/service/interfaces/ITranslationService';
import { TranslationPathEnum } from '../i18n/resources/translationPath.enum';
import { TranslationLocaleEnum } from '../i18n/resources/translationLocale.enum';

@Injectable()
export class CheckConnectionService implements HttpInterceptor {

  constructor(@Inject('ITranslationService') private _ITranslationService: ITranslationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      const validationResult = new ValidationResultModel();
      const translationPath = TranslationPathEnum.interceptorsCheckConnection;
      const translatedMessage = this._ITranslationService.getResource(translationPath, 'ConnectionError', TranslationLocaleEnum.enUS);
      validationResult.message = translatedMessage;
      return observableThrowError(validationResult);
    }
    return next.handle(req);
  }
}
