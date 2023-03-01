import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  URL_STUDENT_BY_TEACHER = 'http://localhost:8080/api/students/list-id-teacher';
  constructor(private httpClient: HttpClient) { }
  /**
   * Create by: VanNTC
   * Date created: 01/03/2023
   * Function: get list student by id teacher
   */
  getAllStudentByIdTeacher(request: any, id: number): Observable<any> {
    const params = request;
    return this.httpClient.get<any>(`${this.URL_STUDENT_BY_TEACHER}/${id}`, {params});
  }
}
