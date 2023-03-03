import { Component, OnInit } from '@angular/core';
import {PointManagement} from "../../entity/point/point-management";
import {PointService} from "../../service/point.service";

@Component({
  selector: 'app-list-point',
  templateUrl: './list-point.component.html',
  styleUrls: ['./list-point.component.css']
})
export class ListPointComponent implements OnInit {
  pointManagementList: PointManagement[] = [];
  teacherId = 1;
  studentName = '';
  // @ts-ignore
  messageSemesterOne: string;
  // @ts-ignore
  messageSemesterTwo: string;

  constructor(private pointService: PointService) {

  }

  ngOnInit() {
    this.search();
  }

  getAll() {
    return this.pointService.getAll(this.teacherId).subscribe(next => {
      this.pointManagementList = next;
    });
  }


  editPoint1(id: number, value: string, value2: string) {
    // this.messageSemesterOne = '';
    // this.messageSemesterTwo = '';
    this.pointService.editPoint(id, Number(value), Number(value2)).subscribe(next => {
      alert('Sửa điểm thành công');
      return this.getAll();
    }, error => {
      console.log(error);
      for (let i = 0; i < error.error.length; i++) {
        if (error.error[i].field === 'semesterOne') {
          this.messageSemesterOne = error.error[i].defaultMessage;
        }
        if (error.error[i].field === 'semesterTwo') {
          this.messageSemesterTwo = error.error[i].defaultMessage;
        }
      }
    });
  }

  search() {
    this.pointService.searchStudent(this.teacherId, this.studentName).subscribe(next => {
      this.pointManagementList = next;
    });
  }

}
