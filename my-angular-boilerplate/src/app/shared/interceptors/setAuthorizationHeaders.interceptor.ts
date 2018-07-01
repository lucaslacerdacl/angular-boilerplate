import { Injectable, Inject } from '@angular/core';
import { ILocalStorage } from '../storage/interfaces/ILocalStorage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SetAuthorizationHeadersService implements HttpInterceptor {

  constructor(@Inject('ILocalStorage') private _ILocalStorageService: ILocalStorage ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _req = req.clone({ setHeaders: {'Authorization': `bearer ${this._ILocalStorageService.getValueByKey('token')}` }});
    return next.handle(_req);
  }

}
