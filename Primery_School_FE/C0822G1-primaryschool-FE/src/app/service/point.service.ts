import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PointManagement} from "../entity/point/point-management";
import {EditPoint} from "../entity/point/edit-point";

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(teacherId: number): Observable<PointManagement[]> {
    return this.httpClient.get<PointManagement[]>('http://localhost:8080/pointManagement/' + teacherId);
  }

  editPoint(id: number, one: number, two: number) {
    const obj: EditPoint = {
      id,
      semesterOne: one,
      semesterTwo: two
    };
    return this.httpClient.put('http://localhost:8080/pointManagement/editPoint/', obj);
  }

  searchStudent(teacherId: number, studentName: String): Observable<PointManagement[]> {
    return this.httpClient.get<PointManagement[]>('http://localhost:8080/pointManagement/search?teacherId=' + teacherId + '&studentName=' + studentName);

  }

}
