import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchInformationListComponent } from './search-information-list/search-information-list.component';

const routes: Routes = [
  {path: 'search-information', pathMatch: 'full', component: SearchInformationListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchInformationRoutingModule { }
