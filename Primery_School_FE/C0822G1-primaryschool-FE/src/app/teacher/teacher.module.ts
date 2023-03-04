import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherUpdateComponent } from './teacher-update/teacher-update.component';
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [TeacherListComponent, TeacherUpdateComponent],

    imports: [
        CommonModule,
        TeacherRoutingModule,
        ReactiveFormsModule
    ]
})
export class TeacherModule { }
