import { LocalStorageService } from './../storage/implementations/localStorage/localStorage.service';
import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ILocalStorage } from '../storage/interfaces/ILocalStorage';

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
