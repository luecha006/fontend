import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {AccordionModule} from 'primeng/accordion';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    BrowserAnimationsModule,
    CascadeSelectModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    InputTextModule,
    ButtonModule,
    DialogModule,
    MenubarModule,
    MenuModule,
    CardModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
