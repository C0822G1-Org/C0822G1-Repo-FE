import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TimeTable} from '../../entity/timetable/time-table';
import {Block} from '../../entity/student/block';
import {Year} from '../../entity/student/year';
import {Teacher} from '../../entity/teacher/teacher';
import {Clazz} from '../../entity/student/clazz';
import {ClazzService} from '../../service/clazz.service';
import {BlockService} from '../../service/block.service';
import {TeacherService} from '../../service/teacher.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {StudentService} from '../../service/student.service';
import {Student} from '../../entity/student/student';

@Component({
  selector: 'app-class-update',
  templateUrl: './class-update.component.html',
  styleUrls: ['./class-update.component.css']
})
export class ClassUpdateComponent implements OnInit {

  clazzForm: FormGroup = new FormGroup({
    clazzId: new FormControl(),
    timeTable: new FormControl(""),
    block:  new FormControl(""),
    clazzName:  new FormControl(""),
    year:  new FormControl(""),
    teacher:  new FormControl(""),
    flagDelete:  new FormControl(""),
    schoolYear:  new FormControl(""),
  })

  clazzList: Clazz[] =[];
  blockList: Block[] =[];
  teacherList: Teacher[] = [];
  studentList: Student[] = [];
  id: number = 0;
  searchForm: FormGroup = new FormGroup({
    clazz: new FormControl("")
  })


  constructor(private clazzService: ClazzService,
              private blockService: BlockService,
              private teacherService: TeacherService,
              private router: Router,
              private studentService : StudentService,
              private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap) => {
      this.id = parseInt(<string>paramMap.get('id'))
      if (this.id !=null) {
        this.getClazz(this.id)
        this.studentService.getAllClazzz(this.id).subscribe(data=>{
          this.studentList = data;
        })
      }
    })
  }

  ngOnInit(): void {
    this.teacherService.getAllTeacher().subscribe(data =>{
      this.teacherList = data;
      // console.log(data)
    })
    this.blockService.getAllBlock().subscribe(data =>{
      this.blockList = data;
      // console.log(data)
    })
    this.clazzService.getAllClazzStudent().subscribe(data=>{
      this.clazzList =data;
      // console.log(data);
    })
  }



  private getClazz(id: number) {
    return this.clazzService.findById(id).subscribe(clazz =>{
      this.clazzForm.patchValue(clazz);
      // console.log(clazz);
    })
  }

  compareBlock(o1: Block, o2: Block): boolean {
    return o1 && o2 ? o1.blockId === o2.blockId : o1 === o2;
  }

  compareTeacher(o1: Teacher, o2: Teacher): boolean {
    return o1 && o2 ? o1.teacherId === o2.teacherId : o1 === o2;
  }


  update(id:number){
    // console.log("đây là id:"+id);
    if (this.clazzForm != undefined && id != null){
      const clazz = this.clazzForm.value;
      // console.log(clazz)
      this.clazzService.updateClazz(id, clazz).subscribe(()=>{
        if (this.clazzForm != undefined){
          this.clazzForm.reset();
          this.router.navigateByUrl("/class");
        }
      }, error => {
        this.router.navigateByUrl("/class/update")
      })
    }
  }

}
