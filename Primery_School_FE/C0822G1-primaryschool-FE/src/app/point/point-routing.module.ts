import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListPointComponent} from "./list-point/list-point.component";

const routes: Routes = [
  {path: '', component: ListPointComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointRoutingModule { }
