import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { ServicesModule } from '../../services/services.module';
import { MapperModule } from '../../mapper/mapper.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ServicesModule,
    MapperModule
  ],
  declarations: []
})
export class ComponentsModule { }
