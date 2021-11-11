import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayTableRoutingModule } from './display-table-routing.module';
import { DisplayTableListComponent } from './display-table-list/display-table-list.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [DisplayTableListComponent],
  imports: [
    CommonModule,
    DisplayTableRoutingModule,
    
    ButtonModule,
    TableModule
  ]
})
export class DisplayTableModule {
}