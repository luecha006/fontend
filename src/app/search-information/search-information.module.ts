import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import en from '@angular/common/locales/en';
registerLocaleData(en);

import { SearchInformationRoutingModule } from './search-information-routing.module';
import { SearchInformationListComponent } from './search-information-list/search-information-list.component';

import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import {StyleClassModule} from 'primeng/styleclass';

@NgModule({
  declarations: [SearchInformationListComponent],
  imports: [
    CommonModule,
    SearchInformationRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,

    CalendarModule,
    InputNumberModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    StyleClassModule
  ]
})
export class SearchInformationModule { }
