import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student.service';
import {FormBuilder} from '@angular/forms';
import {PageStudentDto} from '../../dto/page-student-dto';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {
  }

}
