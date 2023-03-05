
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentCreateComponent} from './student-create/student-create.component';
import {HomeroomClassComponent} from './homeroom-class/homeroom-class.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {StudentDeleteComponent} from './student-delete/student-delete.component';
import {StudentUpdateComponent} from './student-update/student-update.component';
import {StudentSearchComponent} from './student-search/student-search.component';

const routes: Routes = [
  {path: '', component: StudentListComponent},
  {path: 'create', component: StudentCreateComponent},
  {path: 'delete', component: StudentDeleteComponent},
  {path: 'homeroom', component: HomeroomClassComponent},
  {path: 'search', component: StudentSearchComponent},
  {path:'detail/:id',component: StudentDetailComponent},
  {path:'update/:id',component: StudentUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
