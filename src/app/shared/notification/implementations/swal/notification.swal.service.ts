import { Injectable, Inject } from '@angular/core';
import { INotificationSuccess } from '../../interfaces/INotificationSuccess';
import { INotificationError } from '../../interfaces/INotificationError';
import { INotificationAlert } from '../../interfaces/INotificationAlert';
import { INotificationLoading } from '../../interfaces/INotificationLoading';
import { INotificationQuestion } from '../../interfaces/INotificationQuestion';
import { INotificationInfo } from '../../interfaces/INotificationInfo';
import swal from 'sweetalert2';
import { ITranslationService } from '../../../translation/services/interfaces/ITranslationService';
import { TranslationPathEnum } from '../../../translation/resources/translationPath.enum';
import { TranslationLocaleEnum } from '../../../translation/resources/translationLocale.enum';

@Injectable()
export class NotificationService implements INotificationSuccess, INotificationError, INotificationAlert,
  INotificationInfo, INotificationQuestion, INotificationLoading {

  constructor(@Inject('ITranslationService') private _ITranslationService: ITranslationService) { }

  openLoading(options?: object): Promise<any> {
    const properties = Object.assign({
      allowOutsideClick: false
    }, options);
    return swal(properties);
  }
  closeLoading(): void {
    swal.close();
  }
  showQuestionNotification(msg: string, options?: object): Promise<any> {
    // tslint:disable-next-line:max-line-length
    const title = this._ITranslationService.getResource(TranslationPathEnum.notification, 'Doubt', TranslationLocaleEnum.enUS);
    const yes = this._ITranslationService.getResource(TranslationPathEnum.notification, 'Yes', TranslationLocaleEnum.enUS);
    const no = this._ITranslationService.getResource(TranslationPathEnum.notification, 'No', TranslationLocaleEnum.enUS);
    const properties = Object.assign(
      {
        title: title,
        text: msg,
        showCancelButton: true,
        confirmButtonText: yes,
        cancelButtonText: no
      },
      options
    );
    return swal(properties);
  }
  showInfoNotification(msg: string, options?: object): Promise<any> {
    const title = this._ITranslationService.getResource(TranslationPathEnum.notification, 'Information', TranslationLocaleEnum.enUS);
    const properties = Object.assign(
      {
        title: title,
        text: msg
      },
      options);
    return swal(properties);
  }
  showAlertNotification(msg: string, options?: object): Promise<any> {
    const title = this._ITranslationService.getResource(TranslationPathEnum.notification, 'Attention', TranslationLocaleEnum.enUS);
    const properties = Object.assign(
      {
        title: title,
        text: msg
      },
      options);
    return swal(properties);
  }
  showErrorNotification(msg: string, options?: object): Promise<any> {
    const title = this._ITranslationService.getResource(TranslationPathEnum.notification, 'Error', TranslationLocaleEnum.enUS);
    const properties = Object.assign(
      {
        title: title,
        text: msg
      },
      options);
    return swal(properties);
  }
  showSuccessNotification(msg: string, options?: object): Promise<any> {
    const title = this._ITranslationService.getResource(TranslationPathEnum.notification, 'Success', TranslationLocaleEnum.enUS);
    const properties = Object.assign(
      {
        title: title,
        text: msg
      },
      options);
    return swal(properties);
  }
}
