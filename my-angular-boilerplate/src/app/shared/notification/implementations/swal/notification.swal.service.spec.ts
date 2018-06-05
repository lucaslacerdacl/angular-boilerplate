import { TestBed, inject } from '@angular/core/testing';
import { NotificationService } from './notification.swal.service';

describe('NotificationService', () => {

  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService();
  });

  it('should be created NotificationService', () => {
    expect(service).toBeTruthy();
  });

  it('should open loading', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.openLoading();
    expect(getSwal).toHaveBeenCalledWith({});
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
      title: 'Dúvida!',
      text: 'Teste',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    });
  });

  it('should show information', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showInfoNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Informação!', text: 'Teste'});
  });

  it('should show alert', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showAlertNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Atenção!', text: 'Teste'});
  });

  it('should show error', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showErrorNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Erro!', text: 'Teste'});
  });

  it('should show success', () => {
    const swal = require('sweetalert2');
    const getSwal = spyOn(swal, 'default').and.returnValue(new Promise<any>(() => {}));
    service.showSuccessNotification('Teste');
    expect(getSwal).toHaveBeenCalledWith({title: 'Sucesso!', text: 'Teste'});
  });
});
