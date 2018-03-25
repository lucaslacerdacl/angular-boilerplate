import { NotificationSwalService } from './shared/notification/implementations/swal/notification.swal.service';
import { INotificationSuccess } from './shared/notification/interfaces/INotificationSuccess';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutesModule } from './app.routes.module';
import { CrudsModule } from './modules/cruds/cruds.module';
import { PagesModule } from './modules/pages/pages.module';
import { ComponentsModule } from './modules/components/components.module';
import { RestService } from './services/rest.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    SharedModule,
    CrudsModule,
    PagesModule,
    ComponentsModule
  ],
  providers: [
    RestService,
    { provide: 'INotificationAlert', useClass: NotificationSwalService },
    { provide: 'INotificationError', useClass: NotificationSwalService },
    { provide: 'INotificationInfo', useClass: NotificationSwalService },
    { provide: 'INotificationLoading', useClass: NotificationSwalService },
    { provide: 'INotificationQuestion', useClass: NotificationSwalService },
    { provide: 'INotificationSuccess', useClass: NotificationSwalService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
