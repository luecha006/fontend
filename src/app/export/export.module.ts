import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ExportRoutingModule } from './export-routing.module';
import { ExportListComponent } from './export-list/export-list.component';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [ExportListComponent],
  imports: [
    CommonModule,
    ExportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    CalendarModule,
    HttpClientModule
  ]
})
export class ExportModule { }
