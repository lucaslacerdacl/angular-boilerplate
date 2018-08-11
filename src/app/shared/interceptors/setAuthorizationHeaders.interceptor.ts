import { Injectable, Inject } from '@angular/core';
import { ILocalStorageService } from '../storage/interfaces/ILocalStorage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SetAuthorizationHeadersService implements HttpInterceptor {

  constructor(@Inject('ILocalStorageService') private _ILocalStorageService: ILocalStorageService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _req = req.clone({ setHeaders: {'Authorization': `bearer ${this._ILocalStorageService.getValueByKey('token')}` }});
    return next.handle(_req);
  }

}
