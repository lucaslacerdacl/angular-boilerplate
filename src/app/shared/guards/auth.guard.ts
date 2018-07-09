import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ILocalStorage } from '../storage/interfaces/ILocalStorage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('ILocalStorage') private _ILocalStorage: ILocalStorage) {

  }
  canActivate(): boolean {
    if (this._ILocalStorage.getValueByKey('token') && this._ILocalStorage.getValueByKey('userId')) {
      return true;
    } else {
      return false;
    }
  }
}
