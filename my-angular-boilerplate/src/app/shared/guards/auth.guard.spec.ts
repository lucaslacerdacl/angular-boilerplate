import { LocalStorageService } from './../helpers/localStorage.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, LocalStorageService]
    });
  });

  it('should create AuthGuard', inject([AuthGuard, LocalStorageService], (guard: AuthGuard, localStorageService: LocalStorageService) => {
    expect(guard).toBeTruthy();
  }));

  // tslint:disable-next-line:max-line-length
  it('should not authorize, null token', inject([AuthGuard, LocalStorageService], (guard: AuthGuard, localStorageService: LocalStorageService) => {
    const getTokenSpy = spyOn<LocalStorageService>(localStorageService, 'getToken').and.returnValue('');
    expect(guard.canActivate()).toBe(false);
    expect(getTokenSpy).toHaveBeenCalled();
  }));

  // tslint:disable-next-line:max-line-length
  it('should not authorize, null token and user id', inject([AuthGuard, LocalStorageService], (guard: AuthGuard, localStorageService: LocalStorageService) => {
    const getTokenSpy = spyOn<LocalStorageService>(localStorageService, 'getToken').and.returnValue('31231213');
    const getUserIdSpy = spyOn<LocalStorageService>(localStorageService, 'getUserId').and.returnValue('');
    expect(guard.canActivate()).toBe(false);
    expect(getTokenSpy).toHaveBeenCalled();
    expect(getUserIdSpy).toHaveBeenCalled();
  }));

  it('should authorize', inject([AuthGuard, LocalStorageService], (guard: AuthGuard, localStorageService: LocalStorageService) => {
    const getTokenSpy = spyOn<LocalStorageService>(localStorageService, 'getToken').and.returnValue('123456');
    const getUserIdSpy = spyOn<LocalStorageService>(localStorageService, 'getUserId').and.returnValue('147258369');
    expect(guard.canActivate()).toBe(true);
    expect(getTokenSpy).toHaveBeenCalled();
    expect(getUserIdSpy).toHaveBeenCalled();
  }));
});
