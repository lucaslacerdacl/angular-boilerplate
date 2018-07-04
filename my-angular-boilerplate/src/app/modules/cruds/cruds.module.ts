import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';
import { ServicesModule } from '../../services/services.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ComponentsModule,
    ServicesModule
  ],
  declarations: []
})
export class CrudsModule { }
