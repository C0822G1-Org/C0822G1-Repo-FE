import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageStudentDto} from '../dto/page-student-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private URL_API_STUDENT = 'http://localhost:8080/students';

  constructor(private httpClient: HttpClient) {
  }

  getPageStudent(): Observable<PageStudentDto> {
    return this.httpClient.get<PageStudentDto>(this.URL_API_STUDENT);
  }


  searchStudent(nameStudent: any, statusStudent: any, request: any): Observable<any> {
    const params = request;
    return this.httpClient.get<any>('http://localhost:8080/students?name=' + nameStudent + '&status=' + statusStudent, {params});
  }


}
