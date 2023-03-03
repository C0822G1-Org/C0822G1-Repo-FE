import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BodyComponent} from "./body/body.component";
import {TeacherUpdateComponent} from "../teacher/teacher-update/teacher-update.component";


const routes: Routes = [
  {path: '', component: BodyComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
