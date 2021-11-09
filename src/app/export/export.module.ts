import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportRoutingModule } from './export-routing.module';
import { ExportListComponent } from './export-list/export-list.component';


@NgModule({
  declarations: [ExportListComponent],
  imports: [
    CommonModule,
    ExportRoutingModule
  ]
})
export class ExportModule { }
