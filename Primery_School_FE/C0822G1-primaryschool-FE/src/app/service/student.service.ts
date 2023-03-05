import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageStudentDto} from '../dto/page-student-dto';
import {Student} from '../entity/student/student';

    const STUDENT_URL = 'http://localhost:8080/api/clazz/student/';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private URL_API_STUDENT = 'http://localhost:8080/students';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * create by :VinhLD
   * date create : 02/03/2023
   * function: search student by name and status
   * "@param" studentToSearch
   * "@param pageNumber
   */
  getPageStudent(studentToSearch: any, pageNumber: any): Observable<PageStudentDto> {
    return this.httpClient.post<PageStudentDto>(this.URL_API_STUDENT +
      '/search?page=' + pageNumber, studentToSearch);
  }

  getAllClazz(clazz: string): Observable<Student[]> {
    let url = STUDENT_URL;
      url +='search-clazz-student?clazz.clazzName=2A';
    return this.httpClient.get<Student[]>(url)
  }
  getAllClazzz(clazz: number): Observable<Student[]> {
    this.httpClient.patch('http://localhost:8080/api/clazz/student/up-class', {});
    return this.httpClient.get<Student[]>('http://localhost:8080/api/clazz/student/search-clazz-student/a/' + clazz)

  }

  upClass():any {
    console.log("ádad");
    return this.httpClient.patch('http://localhost:8080/api/clazz/student/up-class', {});
  }
}
