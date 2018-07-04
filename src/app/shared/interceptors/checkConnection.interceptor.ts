import { ValidationResultModel } from './../http/validationResult.model';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CheckConnectionService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      const validationResult = new ValidationResultModel();
      validationResult.message = 'Ocorreu um erro de conexão! Verifique se está conectado na internet!';
      return Observable.throw(validationResult);
    }
    return next.handle(req);
  }
}
