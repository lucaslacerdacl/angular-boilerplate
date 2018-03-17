import { LocalStorageService } from './../helpers/localStorage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService) {

  }
  canActivate(): boolean {
    if (this.localStorageService.getToken() && this.localStorageService.getUserId()) {
      return true;
    } else {
      return false;
    }
  }
}
