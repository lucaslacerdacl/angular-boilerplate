import { Injectable } from '@angular/core';
import { INotificationSuccess } from '../../interfaces/INotificationSuccess';
import { INotificationError } from '../../interfaces/INotificationError';
import { INotificationAlert } from '../../interfaces/INotificationAlert';
import { INotificationLoading } from '../../interfaces/INotificationLoading';
import { INotificationQuestion } from '../../interfaces/INotificationQuestion';
import { INotificationInfo } from '../../interfaces/INotificationInfo';
import swal from 'sweetalert2';

@Injectable()
export class NotificationSwalService implements INotificationSuccess, INotificationError, INotificationAlert,
  INotificationInfo, INotificationQuestion, INotificationLoading {
  openLoading(options?: object): Promise<any> {
    const properties = Object.assign({}, options);
    return swal(properties);
  }
  closeLoading(): void {
    swal.close();
  }
  showQuestionNotification(msg: string, options?: object): Promise<any> {
    const properties = Object.assign(
      {
        title: 'Dúvida!',
        text: msg,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      },
      options
    );
    return swal(properties);
  }
  showInfoNotification(msg: string, options?: object): Promise<any> {
    const properties = Object.assign(
      {
        title: 'Informação!',
        text: msg
      },
      options);
    return swal(properties);
  }
  showAlertNotification(msg: string, options?: object): Promise<any> {
    const properties = Object.assign(
      {
        title: 'Atenção!',
        text: msg
      },
      options);
    return swal(properties);
  }
  showErrorNotification(msg: string, options?: object): Promise<any> {
    const properties = Object.assign(
      {
        title: 'Erro!',
        text: msg
      },
      options);
    return swal(properties);
  }
  showSuccessNotification(msg: string, options?: object): Promise<any> {
    const properties = Object.assign(
      {
        title: 'Sucesso!',
        text: msg
      },
      options);
    return swal(properties);
  }
}
