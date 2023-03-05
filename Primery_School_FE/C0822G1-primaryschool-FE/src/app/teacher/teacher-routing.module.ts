import { Routes, RouterModule } from '@angular/router';
import {TeacherUpdateComponent} from "./teacher-update/teacher-update.component";
import {NgModule} from '@angular/core';
import {TeacherSearchComponent} from './teacher-search/teacher-search.component';

const routes: Routes = [
  {path: '', component: TeacherSearchComponent},
  {path: 'search', component: TeacherSearchComponent},
  {path: 'editInfoTeacher', component: TeacherUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
