import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchInformationRoutingModule } from './search-information-routing.module';
import { SearchInformationListComponent } from './search-information-list/search-information-list.component';


@NgModule({
  declarations: [SearchInformationListComponent],
  imports: [
    CommonModule,
    SearchInformationRoutingModule
  ]
})
export class SearchInformationModule { }
