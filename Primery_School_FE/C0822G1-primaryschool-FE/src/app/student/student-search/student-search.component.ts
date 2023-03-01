import {Component, OnInit} from '@angular/core';
import {PageStudentDto} from '../../dto/page-student-dto';
import {StudentService} from '../../service/student.service';
import {FormBuilder} from '@angular/forms';
import {StudentDto} from '../../dto/student-dto';


@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit {
  nameStudentSearch = '';
  statusStudentSearch = '';
  pageNumber = 0;
  totalPage = 0;


  studentDto: StudentDto[] = [];

  pageStudentDto!: PageStudentDto;
  request = {page: 0, size: 5};

  constructor(private studentService: StudentService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchStudent(this.nameStudentSearch, this.statusStudentSearch);
  }


  // searchStudent(value: string, value: string): void {
  //   this.studentService.getPageStudent().subscribe(data => {
  //     this.pageStudentDto = data;
  //   });
  // }


  // tslint:disable-next-line:typedef
  searchStudent(studentNameSearch: string, statusStudentSeacrh: string) {
    this.nameStudentSearch = studentNameSearch;
    this.statusStudentSearch = statusStudentSeacrh;
    this.studentService.searchStudent(studentNameSearch.trim(), statusStudentSeacrh, this.request).subscribe(data => {
      this.pageStudentDto = data;
      this.studentDto = data.content;
      this.totalPage = data.totalPage;
      this.pageNumber = data.pageNumber;

    });

  }
}
