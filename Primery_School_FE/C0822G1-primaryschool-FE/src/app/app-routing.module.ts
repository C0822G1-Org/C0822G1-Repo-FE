import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentListComponent} from './student/student-list/student-list.component';
import {StudentCreateComponent} from './student/student-create/student-create.component';
import {StudentUpdateComponent} from './student/student-update/student-update.component';

const routes: Routes = [
  {path: 'body', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)},
  {path: 'student', loadChildren: () => import('./student/student.module').then(module => module.StudentModule)},
  {path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(module => module.TeacherModule)},
  {path: 'security', loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)},
  {path: 'timetable', loadChildren: () => import('./timetable/timetable.module').then(module => module.TimetableModule)},
  {path: '', component: StudentListComponent},
  {path: 'students/create-student', component: StudentCreateComponent},
  {path: 'students/update-student/:studentId', component: StudentUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
