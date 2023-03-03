import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../entity/student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private  httpClient: HttpClient) {
  }
  /**
   * Hoang NM
   * Date created: 3/2/2023
   */
  URL_STUDENT_LIST = 'http://localhost:8080/api/students/list';
  URL_STUDENT = 'http://localhost:8080/api/students';
  URL_STUDENT_CREATE = 'http://localhost:8080/api/students/create-student';
  URL_STUDENT_UPDATE = 'http://localhost:8080/api/students/update-student';

  findById(id: number ): Observable<Student> {
    return this.httpClient.get<Student>(`${(this.URL_STUDENT)}/${id}`);
  }
  saveStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.URL_STUDENT_CREATE, student);
  }

  // tslint:disable-next-line:typedef
  updateStudent(student: Student) {
    return this.httpClient.put(`${(this.URL_STUDENT_UPDATE)}`, student);
  }
  findAll(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.URL_STUDENT_LIST);
  }
}
