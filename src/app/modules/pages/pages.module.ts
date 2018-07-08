import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';
import { MapperModule } from '../../mapper/mapper.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ComponentsModule
  ],
  declarations: []
})
export class PagesModule { }
