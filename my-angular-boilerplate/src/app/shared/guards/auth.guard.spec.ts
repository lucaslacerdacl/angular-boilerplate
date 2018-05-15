import { LocalStorageService } from './../storage/implementations/localStorage/localStorage.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let localStorageMock: LocalStorageService;
  beforeEach(() => {
    const providers = TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: 'ILocalStorage', useClass: LocalStorageService }
      ]
    });
    localStorageMock = providers.get('ILocalStorage');
    service = new AuthGuard(localStorageMock);
  });

  it('should create AuthGuard', () => {
    expect(service).toBeTruthy();
  });

  it('should not authorize, null token', () => {
    const getTokenSpy = spyOn<LocalStorageService>(localStorageMock, 'getValueByKey')
      .and.callFake((params) => {
        if (params === 'token') {
          return '';
        }
      }).and.returnValue('');
    expect(service.canActivate()).toBe(false);
    expect(getTokenSpy).toHaveBeenCalled();
  });

  it('should not authorize, null token and user id', () => {
    const getValueByKeySpy = spyOn<LocalStorageService>(localStorageMock, 'getValueByKey')
      .and.callFake((params) => {
        if (params === 'token') {
          return '';
        } else if (params === 'userId') {
          return '';
        }
      }).and.returnValue('');
    expect(service.canActivate()).toBe(false);
    expect(getValueByKeySpy).toHaveBeenCalled();
  });

  it('should authorize', () => {
    const getValueByKeySpy = spyOn<LocalStorageService>(localStorageMock, 'getValueByKey')
      .and.callFake((params) => {
        if (params === 'token') {
          return '123456';
        } else if (params === 'userId') {
          return '147258369';
        }
      }).and.returnValue('123456');
    expect(service.canActivate()).toBe(true);
    expect(getValueByKeySpy).toHaveBeenCalled();
  });
});
