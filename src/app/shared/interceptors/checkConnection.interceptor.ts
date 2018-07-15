import { ValidationResultModel } from '../http/validationResult.model';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { ITranslationService } from '../translation/services/interfaces/ITranslationService';
import { TranslationPathEnum } from '../translation/resources/translationPath.enum';
import { TranslationLocaleEnum } from '../translation/resources/translationLocale.enum';

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
