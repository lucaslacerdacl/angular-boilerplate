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

  it('should not authorize', inject([AuthGuard, LocalStorageService], (guard: AuthGuard, localStorageService: LocalStorageService) => {
    spyOn<LocalStorageService>(localStorageService, 'getToken').and.returnValue('');
    spyOn<LocalStorageService>(localStorageService, 'getUserId').and.returnValue('');
    expect(guard.canActivate()).toBe(false);
  }));

  it('should authorize', inject([AuthGuard, LocalStorageService], (guard: AuthGuard, localStorageService: LocalStorageService) => {
    spyOn<LocalStorageService>(localStorageService, 'getToken').and.returnValue('123456');
    spyOn<LocalStorageService>(localStorageService, 'getUserId').and.returnValue('147258369');
    expect(guard.canActivate()).toBe(true);
  }));
});
