import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true })],
  exports: [RouterModule]
})
export class AppRoutesModule { }
