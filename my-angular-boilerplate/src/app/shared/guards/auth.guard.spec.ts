import { LocalStorageService } from './../storage/implementations/localStorage/localStorage.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: 'ILocalStorage', useClass: LocalStorageService }
      ]
    });
  });

  it('should create AuthGuard', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  // tslint:disable-next-line:max-line-length
  it('should not authorize, null token', inject([AuthGuard], (guard: AuthGuard) => {
    const localStorageService = TestBed.get('ILocalStorage');
    const getTokenSpy = spyOn<LocalStorageService>(localStorageService, 'getValueByKey').and.callFake((params) => {
      if (params === 'token') {
        return '';
      }
    }).and.returnValue('');
    expect(guard.canActivate()).toBe(false);
    expect(getTokenSpy).toHaveBeenCalled();
  }));

  // tslint:disable-next-line:max-line-length
  it('should not authorize, null token and user id', inject([AuthGuard], (guard: AuthGuard) => {
    const localStorageService = TestBed.get('ILocalStorage');
    const getValueByKeySpy = spyOn<LocalStorageService>(localStorageService, 'getValueByKey').and.callFake((params) => {
      if (params === 'token') {
        return '';
      } else if (params === 'userId') {
        return '';
      }
    }).and.returnValue('');
    expect(guard.canActivate()).toBe(false);
    expect(getValueByKeySpy).toHaveBeenCalled();
  }));

  it('should authorize', inject([AuthGuard], (guard: AuthGuard) => {
    const localStorageService = TestBed.get('ILocalStorage');
    const getValueByKeySpy = spyOn<LocalStorageService>(localStorageService, 'getValueByKey').and.callFake((params) => {
      if (params === 'token') {
        return '123456';
      } else if (params === 'userId') {
        return '147258369';
      }
    }).and.returnValue('123456');
    expect(guard.canActivate()).toBe(true);
    expect(getValueByKeySpy).toHaveBeenCalled();
  }));
});
