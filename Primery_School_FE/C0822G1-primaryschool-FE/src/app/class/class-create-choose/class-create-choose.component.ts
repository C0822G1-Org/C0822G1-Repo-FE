import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassService} from '../../service/class.service';
import {TeacherService} from '../../service/teacher.service';
import {Teacher} from '../../entity/teacher/teacher';
import {Router} from '@angular/router';
import {Clazz} from '../../entity/student/clazz';
import {Title} from '@angular/platform-browser';

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
      clazzName: new FormControl("",[Validators.required,this.validateClazzName.bind(this)]),
      teacherDto: new FormControl(""),
      schoolYear: new FormControl(),
    }
  );
  clazzNameValidate: (string | undefined)[]= [];

  constructor(private router: Router,private classService:ClassService,private teacherService:TeacherService,private title: Title) {
    this.title.setTitle('thêm mới chọn lớp')
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
        this.clazzNameValidate=data.map((iteam)=> iteam.clazzName);
        console.log(this.clazzNameValidate);
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
        },error => {alert("thêm mới thất bại");},
        ()=>{}
      )
    }
  }

  validateClazzName(control: AbstractControl){
    let check = control.value;
    if (!check) return null;
    const isDuplicate = this.clazzNameValidate.includes(check)

    return isDuplicate?{sai:true}:null;
  }



}
