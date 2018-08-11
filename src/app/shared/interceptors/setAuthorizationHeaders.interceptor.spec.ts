import { SetAuthorizationHeadersService } from './setAuthorizationHeaders.interceptor';
import { ILocalStorageService } from '../storage/interfaces/ILocalStorage';
import { LocalStorageService } from '../storage/implementations/localStorage/localStorage.service';
import { HttpRequest } from '@angular/common/http';

describe('SetAuthorizationHeadersService', () => {
  let service: SetAuthorizationHeadersService;
  let localStorage: ILocalStorageService;
  beforeEach(() => {
    localStorage = new LocalStorageService();
    service = new SetAuthorizationHeadersService(localStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add headers in request', () => {
    const next: any = { handle: jasmine.createSpy('handle') };
    const requestMock = new HttpRequest('GET', '/test');
    const localStorageSpy = spyOn<ILocalStorageService>(localStorage, 'getValueByKey').and.returnValue('jsbnfuldfbx9d73bnc7w==');

    service.intercept(requestMock, next);

    expect(next.handle).toHaveBeenCalledTimes(1);
    expect(localStorageSpy).toHaveBeenCalledTimes(1);
    expect(next.handle).toHaveBeenCalledWith(requestMock.clone({ setHeaders: {'Authorization': 'bearer jsbnfuldfbx9d73bnc7w==' }}));
  });

});
