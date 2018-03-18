import { LocalStorageService } from './helpers/localStorage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SetLoadingService } from './interceptors/setLoading.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: SetLoadingService, multi: true }
  ]
})
export class SharedModule { }
