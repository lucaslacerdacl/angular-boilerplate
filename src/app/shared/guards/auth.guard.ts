import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ILocalStorageService } from '../storage/interfaces/ILocalStorage';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('ILocalStorageService') private _ILocalStorage: ILocalStorageService) {

  }
  canActivate(): boolean {
    if (this._ILocalStorage.getValueByKey('token') && this._ILocalStorage.getValueByKey('userId')) {
      return true;
    } else {
      return false;
    }
  }
}
