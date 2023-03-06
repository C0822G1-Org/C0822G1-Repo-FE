import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentListComponent} from "./student-list/student-list.component";
import {StudentCreateComponent} from "./student-create/student-create.component";
import {HomeroomClassComponent} from "./homeroom-class/homeroom-class.component";
import {StudentDetailComponent} from "./student-detail/student-detail.component";
import {StudentDeleteComponent} from "./student-delete/student-delete.component";
import {StudentUpdateComponent} from "./student-update/student-update.component";

const routes: Routes = [
  {path:'', component:StudentListComponent},
  {path:':year/:clazzId/:page', component:StudentListComponent},
  {path:'create',component: StudentCreateComponent},
  {path:'detail/:id/:year/:clazzId/:page',component: StudentDetailComponent},
  {path:'delete',component: StudentDeleteComponent},
  {path:'update/:id/:year/:clazzId/:page',component: StudentUpdateComponent},
  {path: 'homeroom', component: HomeroomClassComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
