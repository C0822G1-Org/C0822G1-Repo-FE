import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ClassService} from '../../service/class.service';
import {TeacherService} from '../../service/teacher.service';
import {Teacher} from '../../entity/teacher/teacher';
import {Router} from '@angular/router';
import {Clazz} from '../../entity/student/clazz';

@Component({
  selector: 'app-class-create-choose',
  templateUrl: './class-create-choose.component.html',
  styleUrls: ['./class-create-choose.component.css']
})
export class ClassCreateChooseComponent implements OnInit {
  a:number=0 ;
  teacherList: Teacher[]=[];
  classCreate: FormGroup = new FormGroup(
    {
      clazzName: new FormControl(),
      teacherDto: new FormControl(),
      schoolYear: new FormControl(),
    }
  );

  constructor(private router: Router,private classService:ClassService,private teacherService:TeacherService) {
    this.teacherService.getAllTeacherList().subscribe(data=>{

      this.teacherList =data;
      },
      error => {},()=>{}
      )
  }

  ngOnInit(): void {
    this.classService.getListClass().subscribe(data=>{
      if (data!=null){
        this.a=data.length+1;
      }


    },
      error => {},
      ()=>{});

    }
  saveClass(): void {
    if (this.classCreate.valid) {
      const c = this.classCreate.value;
      console.log(c);
      this.classService.saveClass(c).subscribe(data=>{
          alert("thanh cong")
          console.log(this.a);
          this.router.navigateByUrl('class/create/info/'+this.a);
          // this.classCreate.reset();
        },error => {alert("thêm mới thất bại");},
        ()=>{}
      )
    }


  }



}
