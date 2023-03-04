import { Component, OnInit } from '@angular/core';

import {PointManagement} from "../../entity/point/point-management";
import {PointService} from "../../service/point.service";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {StudentService} from "../../service/student/student.service";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-list-point',
  templateUrl: './list-point.component.html',
  styleUrls: ['./list-point.component.css']
})
export class ListPointComponent implements OnInit {

  pointManagementList: PointManagement[] = [];
  teacherId = -1;
  studentName = '';
  // @ts-ignore
  messageSemesterOne: string;
  // @ts-ignore
  messageSemesterTwo: string;

  constructor(private pointService: PointService,
              private tokenStorageService: TokenStorageService,
              private toast: ToastrService) {

  }

  ngOnInit() {
    this.search();
  }

  // getAll() {
  //   return this.pointService.getAll(this.teacherId).subscribe(next => {
  //     this.pointManagementList = next;
  //   });
  // }


  editPoint1(id: number, value: string, value2: string) {
    // this.messageSemesterOne = '';
    // this.messageSemesterTwo = '';
    this.pointService.editPoint(id, Number(value), Number(value2)).subscribe(next => {
      this.toast.success('Cập nhật điểm thành công', 'Thông báo', {positionClass: 'toast-top-center'})
      return this.search();
    }, error => {
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
    const idAccount = parseInt(this.tokenStorageService.getIdAccount());
    this.pointService.searchStudent(idAccount, this.studentName).subscribe(next => {
      this.pointManagementList = next;
    });
  }
}
