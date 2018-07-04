import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';
import { CrudsModule } from '../cruds/cruds.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ComponentsModule,
    CrudsModule
  ],
  declarations: []
})
export class PagesModule { }
