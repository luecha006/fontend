import  en  from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';
import { SearchInformationModule } from './search-information/search-information.module';
import { ExportModule } from './export/export.module';
import { DisplayTableModule } from './display-table/display-table.module';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {CardModule} from 'primeng/card';
import {BadgeModule} from 'primeng/badge';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HomeModule,
    SearchInformationModule,
    ExportModule,
    DisplayTableModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,

    InputTextModule,
    ButtonModule,
    DialogModule,
    MenubarModule,
    MenuModule,
    CardModule,
    DropdownModule,
    BadgeModule,
    CalendarModule,
    CheckboxModule,
    PasswordModule,
    SliderModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
