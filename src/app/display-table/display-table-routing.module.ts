import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayTableListComponent } from './display-table-list/display-table-list.component';

const routes: Routes = [
  {path: 'display-table', pathMatch: 'full', component: DisplayTableListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayTableRoutingModule { }
