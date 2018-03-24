import { Injectable } from '@angular/core';
import { INotificationSuccess } from '../interfaces/INotificationSuccess';
import { INotificationError } from '../interfaces/INotificationError';
import { INotificationAlert } from '../interfaces/INotificationAlert';
import { INotificationLoading } from '../interfaces/INotificationLoading';
import { INotificationQuestion } from '../interfaces/INotificationQuestion';
import { INotificationInfo } from '../interfaces/INotificationInfo';

@Injectable()
export class NotificationSwalService implements INotificationSuccess, INotificationError, INotificationAlert, 
  INotificationInfo, INotificationQuestion, INotificationLoading {
  openLoading(options?: object): Promise<any> {
    throw new Error("Method not implemented.");
  }
  closeLoading(): void {
    throw new Error("Method not implemented.");
  }
  showQuestionNotification(msg: string, options?: object): Promise<any> {
    throw new Error("Method not implemented.");
  }
  showInfoNotification(msg: string, options?: object): Promise<any> {
    throw new Error("Method not implemented.");
  }
  showAlertNotification(msg: string, options?: object): Promise<any> {
    throw new Error("Method not implemented.");
  }
  showErrorNotification(msg: string, options?: object): Promise<any> {
    throw new Error("Method not implemented.");
  }
  showSuccessNotification(msg: string, options?: object): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
