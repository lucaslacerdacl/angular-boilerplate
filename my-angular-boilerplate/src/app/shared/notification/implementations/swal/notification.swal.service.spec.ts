import { TestBed, inject } from '@angular/core/testing';
import { NotificationSwalService } from './notification.swal.service';

describe('NotificationSwalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationSwalService]
    });
  });

  it('should be created NotificationSwalService', inject([NotificationSwalService], (service: NotificationSwalService) => {
    expect(service).toBeTruthy();
  }));

  it('should open loading', inject([NotificationSwalService], (service: NotificationSwalService) => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.openLoading();
    expect(getSwal).toHaveBeenCalledWith({});
  }));

  it('should close loading', inject([NotificationSwalService], (service: NotificationSwalService) => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'close');
    service.closeLoading();
    expect(getSwal).toHaveBeenCalled();
  }));

  it('should show question', inject([NotificationSwalService], (service: NotificationSwalService) => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showQuestionNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({
      title: 'Dúvida!',
      text: 'Teste',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    });
  }));

  it('should show information', inject([NotificationSwalService], (service: NotificationSwalService) => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showInfoNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Informação!', text: 'Teste'});
  }));

  it('should show alert', inject([NotificationSwalService], (service: NotificationSwalService) => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showAlertNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Atenção!', text: 'Teste'});
  }));

  it('should show error', inject([NotificationSwalService], (service: NotificationSwalService) => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showErrorNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Erro!', text: 'Teste'});
  }));

  it('should show success', inject([NotificationSwalService], (service: NotificationSwalService) => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showSuccessNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Sucesso!', text: 'Teste'});
  }));
});
