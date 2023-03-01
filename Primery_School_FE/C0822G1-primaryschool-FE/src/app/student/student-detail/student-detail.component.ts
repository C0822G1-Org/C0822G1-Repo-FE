import {Component, OnInit} from '@angular/core';
import {Student} from '../../entity/student/student';
import {StudentService} from '../../service/Student/student.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  student: Student = {};
  studentId: any;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute,
  ) {
  }

  /**
   * Created by: NuongHT
   * Date created: 01/03/2023
   * Function: get student by studentId
   *
   * @param studentId
   * @return object: student
   */

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.studentId);
      this.studentService.findById(this.studentId).subscribe(next => {
        this.student = next;
      });
    });
  }

}
