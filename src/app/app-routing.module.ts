import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HomeListComponent } from "./home/home-list/home-list.component";
import { DisplayTableListComponent } from "./display-table/display-table-list/display-table-list.component";
import { SearchInformationListComponent } from "./search-information/search-information-list/search-information-list.component";
import { ExportListComponent } from "./export/export-list/export-list.component";

const routes: Routes = [
  {path: 'home', component: HomeListComponent},
  {path: 'display-table', component: DisplayTableListComponent},
  {path: 'search-information', component: SearchInformationListComponent},
  {path: 'export', component: ExportListComponent},
  
  {path:'', redirectTo: "/home", pathMatch:'full'}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
