import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import en from '@angular/common/locales/en';
registerLocaleData(en);

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
// import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import {DropdownModule} from 'primeng/dropdown';
import {ChartModule} from 'primeng/chart';
import { TableModule } from 'primeng/table';

import { HomeRoutingModule } from './home-routing.module';
import { HomeListComponent } from './home-list/home-list.component';

@NgModule({
  declarations: [HomeListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CardModule,
    CalendarModule,
    CheckboxModule,
    PasswordModule,
    DropdownModule,
    ChartModule,
    TableModule
  ],
  bootstrap: [HomeListComponent]
  // ,providers:[ConfirmationService, MessageService]
})
export class HomeModule { }
