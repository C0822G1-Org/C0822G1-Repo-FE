import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherViewDto} from '../../dto/time_table/teacher-view-dto';
import {Student} from "../../entity/student/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  URL_STUDENT_BY_TEACHER = 'http://localhost:8080/api/students/list-id-teacher';
  URL_GET_ID_TEACHER = 'http://localhost:8080/api/students/find-teacher';
  URL_STUDENT_CREATE = 'http://localhost:8080/api/students/create-student';
  URL_STUDENT_UPDATE = 'http://localhost:8080/api/students/update-student';


  constructor(private httpClient: HttpClient) {
  }

  /**
   * Create by: VanNTC
   * Date created: 01/03/2023
   * Function: get list student by id teacher
   */
  getAllStudentByIdTeacher(request: any, id: number): Observable<any> {
    const params = request;
    return this.httpClient.get<any>(`${this.URL_STUDENT_BY_TEACHER}/${id}`, {params});
  }

  getIdTeacherByIdAccount(id: string): Observable<TeacherViewDto> {
   return this.httpClient.get<TeacherViewDto>(this.URL_GET_ID_TEACHER + '/' + id);
  }

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

  /**
   * Created by: HoangNM
   * Date created: 04/03/2023
   * Content: method create and update Student
   *
   * @param student
   * @return list student
   */
  saveStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.URL_STUDENT_CREATE, student);
  }

  updateStudent(student: Student) {
    return this.httpClient.put(`${(this.URL_STUDENT_UPDATE)}`, student);
  }
}
