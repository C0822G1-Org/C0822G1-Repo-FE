import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student.service';
import {ClazzTeacherEdit} from '../../entity/clazz/clazz-teacher-edit';
import {ClazzYear} from '../../entity/clazz/clazz-year';
import {ClazzName} from '../../entity/clazz/clazz-name';
import {ClazzTeacher} from '../../entity/clazz/clazz-teacher';
import {StudentInfoo} from '../../entity/student/student-infoo';
import {TeacherInfo} from '../../entity/teacher/teacher-info';
import {StudentInfooJson} from '../../entity/student/student-infoo-json';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  clazzTeacherEdit: ClazzTeacherEdit = {};
  currentYear: number = new Date().getFullYear();
  yearClazz: number = 0;
  years: ClazzYear[] = [];
  classNames: ClazzName[] = [];
  classTeacher: ClazzTeacher = {};
  studentList: StudentInfoo[] = [];
  student: StudentInfoo = {};
  teachers: TeacherInfo[] = [];
  teacher: TeacherInfo = {};
  clazzId: number = 0;
  teacherIdCards: string[] = [];
  teacherIdCard: string = '';
  page: number = 0;
  studentPage!: StudentInfooJson;

  constructor(private studentService: StudentService, private toastr: ToastrService) {
    this.studentService.getListYear().subscribe(data => {
      this.years = data;
      // console.log(this.currentYear)
    });
  }

  ngOnInit(): void {
  }

  chooseClass(year: string, block: string) {
    this.studentService.getNameClass(year, block).subscribe(data => {
      this.classNames = data;
    });
  }

  searchStudent(year: any, clazzId: any, page: number) {
    this.clazzId = Number(clazzId);
    this.yearClazz = Number(year);
    this.studentList.length = 0;
    // console.log(this.className,year,clazzId);
    this.studentService.getClazzTeacher(year, clazzId).subscribe(data => {
      this.classTeacher = data;
      console.log(data);
    });
    this.studentService.getListStudent(year, clazzId, page).subscribe(data => {
      this.studentPage = data;
      this.studentList = data.content;
    });
  }

  deleteStudent(id: any) {
    this.studentService.deleteStudent(id).subscribe(data => {
      if (data != null) {
        console.log(data);
        this.showDeleteSuccess();
        this.searchStudent(this.yearClazz, this.clazzId, this.page);
      }
    }, error => {
      this.showDeleteError();
    });
  }

  editNameTeacher() {
    this.studentService.getListNameTeacher(this.currentYear).subscribe(data => {
      this.teachers = data;
      console.log(data);
    });
  }

  changeTeacher(teacherName: string) {
    console.log(teacherName);
    if (teacherName !='') {
      this.teacherIdCards = teacherName.split(',');
      this.teacherIdCard = this.teacherIdCards[1];
      this.teacherIdCard = this.teacherIdCard.slice(5);
      console.log(this.teacherIdCard);
      this.studentService.getNameTeacher(this.teacherIdCard, this.yearClazz).subscribe(data => {
        this.teacher = data;
        if (data!=null){
          this.clazzTeacherEdit.teacherId = Number(this.teacher.id);
          this.clazzTeacherEdit.clazzId = Number(this.classTeacher.id);
          console.log(this.clazzTeacherEdit);
          this.studentService.editTeacher(this.clazzTeacherEdit).subscribe(data => {
            if (data != null) {
              this.showEditSuccess();
              this.searchStudent(this.yearClazz, this.clazzId, this.page);
            }
          }, error => {
            this.showEditError();
          });
        }
      },error => {
        this.showEditError();
      });
    }else {
      this.showEditError();
    }

  }

  changePage(page: number) {
    this.searchStudent(this.yearClazz, this.clazzId, page);
  }

  showDeleteSuccess() {
    this.toastr.success('Bạn đã xóa học sinh thành công', 'Thông báo', {positionClass: 'toast-top-center', timeOut: 5000},);
  }

  showDeleteError() {
    this.toastr.error('Xóa không thành công,không tồn tại học sinh cần xóa', 'Thông báo', {
      positionClass: 'toast-top-center',
      timeOut: 5000
    },);
  }

  showEditSuccess() {
    this.toastr.success('Bạn đã thay đổi giáo viên thành công', 'Thông báo', {positionClass: 'toast-top-center', timeOut: 5000},);
  }

  showEditError() {
    this.toastr.error('Thay đổi thất bại,hãy chọn đúng họ tên giáo viên cần thay đổi  ', 'Thông báo', {
      positionClass: 'toast-top-center', timeOut: 5000
    },);
  }
}
