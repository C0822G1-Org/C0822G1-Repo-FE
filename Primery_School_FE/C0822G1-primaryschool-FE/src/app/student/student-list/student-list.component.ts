import { Component, OnInit } from '@angular/core';
import {Student} from '../../entity/student/student';
import {StudentService} from '../../service/Student/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.studentService.findAll().subscribe(next => {
      console.log(next);
      this.studentList = next;
    })
  }

}
