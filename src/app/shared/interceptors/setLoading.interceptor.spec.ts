import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SetLoadingService } from './setLoading.interceptor';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../notification/implementations/swal/notification.swal.service';
import { INotificationLoading } from '../notification/interfaces/INotificationLoading';
import { LocalStorageService } from '../storage/implementations/localStorage/localStorage.service';
import { TranslationService } from '../translation/services/implementations/translation.service';

describe('SetLoadingService', () => {
  let notification: NotificationService;
  let service: SetLoadingService;
  let translationService: TranslationService;
  let localStorageService: LocalStorageService;
  let openLoadingSpy: jasmine.Spy;
  beforeEach(() => {
    localStorageService = new LocalStorageService();
    translationService = new TranslationService(localStorageService);
    notification = new NotificationService(translationService);
    service = new SetLoadingService(notification);
    openLoadingSpy = spyOn<INotificationLoading>(notification, 'openLoading');
  });

  it('should be created SetLoadingService', () => {
    expect(service).toBeTruthy();
  });

  it('should be hide loading', () => {
    const next: any = { handle: () => {}};
    const requestMock = new HttpRequest('GET', '/test', { headers: new HttpHeaders().append('HideLoading', 'true') });

    service.intercept(requestMock, next);

    expect(openLoadingSpy).toHaveBeenCalledTimes(0);
  });

  it('should be show loading', () => {
    const next: any = {
      handle: () => ({
        finally: (callback: Function) => callback()})
    };
    const requestMock = new HttpRequest('GET', '/test');
    const closeLoadingSpy = spyOn<INotificationLoading>(notification, 'closeLoading');

    service.intercept(requestMock, next);

    expect(openLoadingSpy).toHaveBeenCalled();
    expect(closeLoadingSpy).toHaveBeenCalled();
  });
});
