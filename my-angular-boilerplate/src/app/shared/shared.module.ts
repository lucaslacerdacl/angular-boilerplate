import { UnauthorizedResponseService } from './interceptors/unauthorizedResponse.interceptor';
import { CheckConnectionService } from './interceptors/checkConnection.interceptor';
import { LocalStorageService } from './storage/implementations/localStorage/localStorage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SetLoadingService } from './interceptors/setLoading.interceptor';
import { NotificationSwalService } from './notification/implementations/swal/notification.swal.service';
import { RestService } from './services/rest.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    RestService,
    { provide: 'ILocalStorage', useClass: LocalStorageService },
    { provide: 'INotificationAlert', useClass: NotificationSwalService },
    { provide: 'INotificationError', useClass: NotificationSwalService },
    { provide: 'INotificationInfo', useClass: NotificationSwalService },
    { provide: 'INotificationLoading', useClass: NotificationSwalService },
    { provide: 'INotificationQuestion', useClass: NotificationSwalService },
    { provide: 'INotificationSuccess', useClass: NotificationSwalService },
    { provide: HTTP_INTERCEPTORS, useClass: CheckConnectionService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SetLoadingService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedResponseService, multi: true }
  ]
})
export class SharedModule { }
