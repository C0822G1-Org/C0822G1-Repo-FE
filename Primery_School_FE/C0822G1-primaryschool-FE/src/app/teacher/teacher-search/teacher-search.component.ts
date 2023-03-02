import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../service/teacher.service';
import {Teacher} from '../../entity/teacher/teacher';
import {PageTeacher} from '../../dto/page-teacher';

@Component({
  selector: 'app-teacher-search',
  templateUrl: './teacher-search.component.html',
  styleUrls: ['./teacher-search.component.css']
})
export class TeacherSearchComponent implements OnInit {

  pageTeacher!: PageTeacher;

  nameTeacherSearch = '';
  statusTeacherSearch = '';
  pageNumber = 0;
  totalPage = 0;
  request = {page: 0, size: 5};

  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {
  }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  searchTeacher(teacherNameSearch: string, teacherStatusSearch: string) {
    this.nameTeacherSearch = teacherNameSearch;
    this.statusTeacherSearch = teacherStatusSearch;
    this.teacherService.searchTeacher(teacherNameSearch.trim(), teacherStatusSearch, this.request).subscribe(data => {
      this.pageTeacher = data;
      this.teachers = data.content;
      this.totalPage = data.totalPage;
      this.pageNumber = data.pageNumber;
    });
  }
}
