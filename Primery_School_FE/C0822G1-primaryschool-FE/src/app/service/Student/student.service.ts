import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../entity/student/student';
import {findAll} from '@angular/compiler-cli/ngcc/src/utils';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Created by: NuongHT
   * Date created: 01/03/2023
   * Content: method get student by studentId
   *
   * @param studentId
   * @return student
   */

  // @ts-ignore
  findById(id: number):Observable<Student> {
    return this.httpClient.get<Student>("http://localhost:8080/api/students/info/" + id);
  }

  findAll():Observable<Student[]> {
    return this.httpClient.get<Student[]>("http://localhost:8080/api/students/list/");
  }

}
