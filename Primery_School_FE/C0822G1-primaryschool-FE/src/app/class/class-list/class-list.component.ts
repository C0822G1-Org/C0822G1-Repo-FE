import {Component, OnInit} from '@angular/core';
import {Clazz} from '../../entity/student/clazz';
import {Block} from '../../entity/student/block';
import {Teacher} from '../../entity/teacher/teacher';
import {ClazzService} from '../../service/clazz.service';
import {BlockService} from '../../service/block.service';
import {TeacherService} from '../../service/teacher.service';
import {FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../service/student.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  clazzList: Clazz[] = [];
  blockList: Block[] = [];
  teacherList: Teacher[] = [];
  totalPage: number = 0;
  size: number = 0;
  search: string = '';
  p: number = 0;
  clazzIdUpClazz: number = 0;
  nameClazzUpClazz?: string = '';
  formGroup: FormGroup;

  constructor(private clazzService: ClazzService,
              private blockService: BlockService,
              private teacherService: TeacherService,
              private studentService: StudentService) {
    this.formGroup = new FormGroup({
      search: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getAll(this.p);
  }

  getAll(page: number) {
    this.clazzService.getAllClazz(page, this.search.trim()).subscribe(data => {
      // @ts-ignore
      this.clazzList = data['content'];
      // @ts-ignore
      this.totalPage = data['totalPages'];
      // @ts-ignore
      this.p = data['number'];
      // @ts-ignore
      this.size = data['size'];
      console.log(data);
    });
    this.teacherService.getAllTeacher().subscribe(data => {
      this.teacherList = data;
    });
    this.blockService.getAllBlock().subscribe(data => {
      this.blockList = data;
    });
  }

  getDataUpClass(clazz: Clazz) {
    if (clazz.clazzId != undefined) {
      this.clazzIdUpClazz = clazz.clazzId;
      this.nameClazzUpClazz = clazz.clazzName;
    }
  }


  previousPage() {
    if (this.p > 0) {
      this.p = this.p - 1;
      this.getAll(this.p);
    }
  }

  nextPage() {
    if (this.p < this.totalPage - 1) {
      this.p = this.p + 1;
      this.getAll(this.p);
    }
  }


  return() {
    this.search = '';
  }

  searchNameCLass() {
    // this.p = 0;
    // this.ngOnInit();
    this.clazzService.getAllClazz(0, this.formGroup.value.search.trim()).subscribe(data => {
      // @ts-ignore
      this.clazzList = data['content'];
      // @ts-ignore
      this.totalPage = data['totalPages'];
      // @ts-ignore
      this.p = data['number'];
      // @ts-ignore
      this.size = data['size'];
      console.log(data);
    });
    this.teacherService.getAllTeacher().subscribe(data => {
      this.teacherList = data;
    });
    this.blockService.getAllBlock().subscribe(data => {
      this.blockList = data;
    });
    console.log('abc' + this.formGroup.value.search);
  }


  upclasss() {
    this.studentService.upClass().subscribe((data: any) => {
      console.log(data);
    });
    console.log('okok');
    this.ngOnInit()
  }
}
