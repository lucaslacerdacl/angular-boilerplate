import { LocalStorageService } from './../storage/implementations/localStorage/localStorage.service';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let localStorage: LocalStorageService;

  beforeEach(() => {
    localStorage = new LocalStorageService();
    service = new AuthGuard(localStorage);
  });

  it('should create AuthGuard', () => {
    expect(service).toBeTruthy();
  });

  it('should not authorize, null token', () => {
    const getTokenSpy = spyOn<LocalStorageService>(localStorage, 'getValueByKey')
      .and.callFake((params) => {
        if (params === 'token') {
          return '';
        }
      });
    expect(service.canActivate()).toBe(false);
    expect(getTokenSpy).toHaveBeenCalled();
  });

  it('should not authorize, null token and user id', () => {
    const getValueByKeySpy = spyOn<LocalStorageService>(localStorage, 'getValueByKey')
      .and.callFake((params) => {
        if (params === 'token') {
          return '';
        } else if (params === 'userId') {
          return '';
        }
      });
    expect(service.canActivate()).toBe(false);
    expect(getValueByKeySpy).toHaveBeenCalled();
  });

  it('should authorize', () => {
    const getValueByKeySpy = spyOn<LocalStorageService>(localStorage, 'getValueByKey')
      .and.callFake((params) => {
        if (params === 'token') {
          return '123456';
        } else if (params === 'userId') {
          return '147258369';
        }
      });
    expect(service.canActivate()).toBe(true);
    expect(getValueByKeySpy).toHaveBeenCalled();
  });
});
