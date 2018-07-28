import { TestBed, inject } from '@angular/core/testing';
import { NotificationService } from './notification.swal.service';
import { TranslationService } from '../../../i18n/service/implementations/translation.service';
import { LocalStorageService } from '../../../storage/implementations/localStorage/localStorage.service';

describe('NotificationService', () => {

  let service: NotificationService;
  let translationService: TranslationService;
  let localStorageService: LocalStorageService;
  beforeEach(() => {
    localStorageService = new LocalStorageService();
    translationService = new TranslationService(localStorageService);
    service = new NotificationService(translationService);
  });

  it('should be created NotificationService', () => {
    expect(service).toBeTruthy();
  });

  it('should open loading', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.openLoading();
    expect(getSwal).toHaveBeenCalledWith({allowOutsideClick: false});
  });

  it('should close loading', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'close');
    service.closeLoading();
    expect(getSwal).toHaveBeenCalled();
  });

  it('should show question', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showQuestionNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({
      title: 'Doubt',
      text: 'Teste',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    });
  });

  it('should show information', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showInfoNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Information', text: 'Teste'});
  });

  it('should show alert', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showAlertNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Attention', text: 'Teste'});
  });

  it('should show error', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showErrorNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Error', text: 'Teste'});
  });

  it('should show success', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showSuccessNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Success', text: 'Teste'});
  });
});
