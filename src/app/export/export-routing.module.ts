import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportListComponent } from './export-list/export-list.component';

const routes: Routes = [ 
  {path: 'export', pathMatch: 'full', component: ExportListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportRoutingModule { }
