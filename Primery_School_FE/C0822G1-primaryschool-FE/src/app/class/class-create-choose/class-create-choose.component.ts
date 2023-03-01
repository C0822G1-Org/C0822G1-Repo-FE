import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ClassService} from '../../service/class.service';
import {TeacherService} from '../../service/teacher.service';
import {Teacher} from '../../entity/teacher/teacher';

@Component({
  selector: 'app-class-create-choose',
  templateUrl: './class-create-choose.component.html',
  styleUrls: ['./class-create-choose.component.css']
})
export class ClassCreateChooseComponent implements OnInit {
  teacherList: Teacher[]=[];
  ClassCreate: FormGroup = new FormGroup(
    {
      clazzName: new FormControl(),
      teacher: new FormControl(),
    }
  );

  constructor(private classService:ClassService,private teacherService:TeacherService) {
    this.teacherService.getAllTeacherList().subscribe(data=>{

      this.teacherList =data;
      },
      error => {},()=>{}
      )
  }

  ngOnInit(): void {
  }

  saveClass(): void {
    if (this.ClassCreate.valid) {
      const c = this.ClassCreate.value;
      console.log(c);
      this.classService.saveClass(c).subscribe(data=>{
        this.ClassCreate.reset();
        alert("thanh cong")
      },error => {alert("thêm mới thất bại");},
        ()=>{}
      )
    }


  }
}
