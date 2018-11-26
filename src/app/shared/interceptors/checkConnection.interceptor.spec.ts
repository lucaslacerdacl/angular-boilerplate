
import { HttpRequest } from '@angular/common/http';
import { CheckConnectionService } from './checkConnection.interceptor';
import { ValidationResultModel } from '../http/validationResult.model';
import { TranslationService } from '../i18n/service/implementations/translation.service';
import { LocalStorageService } from '../storage/implementations/localStorage/localStorage.service';

describe('CheckConnectionService', () => {
  let service: CheckConnectionService;
  let translationService: TranslationService;
  let localStorageService: LocalStorageService;
  beforeEach(() => {
    localStorageService = new LocalStorageService();
    translationService = new TranslationService(localStorageService);
    service = new CheckConnectionService(translationService);
  });

  it('should be created CheckConnectionService', () => {
    expect(service).toBeTruthy();
  });

  it('should be offline', () => {
    const next: any = { handle: () => {}};
    const requestMock = new HttpRequest('GET', '/test');

    const navigatorSpy = spyOnProperty<Navigator>(navigator, 'onLine').and.returnValue(false);
    const validationResult = new ValidationResultModel();
    validationResult.message = 'A connection error has occurred! Make sure you are connected on the internet!';

    try {
      service.intercept(requestMock, next);
    } catch (error) {
      expect(error).toEqual(validationResult);
    }

    expect(navigatorSpy).toHaveBeenCalled();
  });

  it('should be online', () => {
    const next: any = { handle: () => {}};
    const requestMock = new HttpRequest('GET', '/test');

    const navigatorSpy = spyOnProperty<Navigator>(navigator, 'onLine').and.returnValue(true);

    const result = service.intercept(requestMock, next);
    expect(result).toEqual(service.intercept(requestMock, next));
    expect(navigatorSpy).toHaveBeenCalled();
  });
});
