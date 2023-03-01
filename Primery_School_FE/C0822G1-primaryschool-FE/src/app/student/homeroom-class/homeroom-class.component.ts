import {Component, OnInit} from '@angular/core';
import {StudentInfo} from "../../dto/student/student-info";
import {StudentInfoJson} from "../../dto/student/student-info-json";
import {StudentService} from "../../service/student/student.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-homeroom-class',
  templateUrl: './homeroom-class.component.html',
  styleUrls: ['./homeroom-class.component.css']
})
export class HomeroomClassComponent implements OnInit {
  studentInfo: StudentInfo[] = [];
  studentList!: StudentInfoJson;
  request = {page: 0, size: 5};
  pageNumber = 0;
  totalPages = 0;
  idTeacher = 1;
  clazz: any;

  constructor(private studentService: StudentService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Danh sách học sinh');
  }

  ngOnInit(): void {
    this.getAllStudent(this.request);
  }

  /**
   * Create by: VanNTC
   * Date created: 01/03/2023
   * Function: get list student
   */
  private getAllStudent(request: { page?: any; size?: any; } | undefined): void {
    this.studentService.getAllStudentByIdTeacher(request, this.idTeacher).subscribe(data => {
      this.studentList = data;
      this.studentInfo = data.content;
      this.clazz = this.studentInfo[0].nameClazz;
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      this.pageNumber = data.pageable.pageNumber;
    }, error => {
    }, () => {
    });
  }

    /**
     * Create by: VanNTC
     * Date created: 01/03/2023
     * Function: change page pagination
     * @param pageNumber: number
     */
    changePage(pageNumber: number): void {
      this.request.page = pageNumber;
      this.ngOnInit();
    }
}
