import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'body', loadChildren: () => import("./home/home.module").then(module => module.HomeModule)},
  {path:'student', loadChildren:() => import("./student/student.module").then(module => module.StudentModule)},
  {path: 'teacher', loadChildren: () => import("./teacher/teacher.module").then(module => module.TeacherModule)},
  {path: 'security', loadChildren: () => import("./security/security.module").then(module => module.SecurityModule)},
  {path: 'timetable', loadChildren:() => import("./timetable/timetable.module").then(module => module.TimetableModule)},
  {path: 'class', loadChildren:() => import("./class/class.module").then(module => module.ClassModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
