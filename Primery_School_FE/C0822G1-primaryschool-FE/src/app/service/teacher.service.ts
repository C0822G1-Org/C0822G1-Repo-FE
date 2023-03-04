import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Teacher} from "../entity/teacher/teacher";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) {
  }


  /**
   * Created by: MinhCDK
   * Date created: 03/03/2023
   * Function: findByTeacher
   */

  findByTeacherId(teacherId: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>('http://localhost:8080/api/teacher/' + teacherId)
  }


  /**
   * Created by: MinhCDK
   * Date created: 03/03/2023
   * Function: editInfoTeacher
   */
  editInfoTeacher(teacher: Teacher) {
    return this.httpClient.put('http://localhost:8080/api/teacher/editInfoTeacher', teacher)
  }
}
