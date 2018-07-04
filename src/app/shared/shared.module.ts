import { UnauthorizedResponseService } from './interceptors/unauthorizedResponse.interceptor';
import { CheckConnectionService } from './interceptors/checkConnection.interceptor';
import { LocalStorageService } from './storage/implementations/localStorage/localStorage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SetLoadingService } from './interceptors/setLoading.interceptor';
import { NotificationService } from './notification/implementations/swal/notification.swal.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from './http/implementations/angularHttpClient/http.service';
import { HandleExceptionsService } from './interceptors/handleExceptions.interceptor';
import { SetAuthorizationHeadersService } from './interceptors/setAuthorizationHeaders.interceptor';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    { provide: 'ILocalStorage', useClass: LocalStorageService },
    { provide: 'INotificationAlert', useClass: NotificationService },
    { provide: 'INotificationError', useClass: NotificationService },
    { provide: 'INotificationInfo', useClass: NotificationService },
    { provide: 'INotificationLoading', useClass: NotificationService },
    { provide: 'INotificationQuestion', useClass: NotificationService },
    { provide: 'INotificationSuccess', useClass: NotificationService },
    { provide: 'INotificationSuccess', useClass: NotificationService },
    { provide: 'IHttpService', useClass: HttpService },
    { provide: HTTP_INTERCEPTORS, useClass: CheckConnectionService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SetAuthorizationHeadersService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SetLoadingService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedResponseService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HandleExceptionsService, multi: true }
  ]
})
export class SharedModule { }
