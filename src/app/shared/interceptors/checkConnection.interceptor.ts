import { ValidationResultModel } from '../http/validationResult.model';
import { Observable } from 'rxjs/Observable';
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
      // tslint:disable-next-line:max-line-length
      validationResult.message = this._ITranslationService.getResource(TranslationPathEnum.interceptorsCheckConnection, 'ConnectionError', TranslationLocaleEnum.enUS);
      return Observable.throw(validationResult);
    }
    return next.handle(req);
  }
}
