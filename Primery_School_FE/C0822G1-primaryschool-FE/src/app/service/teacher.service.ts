import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageTeacher} from '../dto/page-teacher';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private URL_API_TEACHER = 'http://localhost:8080/teachers';

  constructor(private  httpClient: HttpClient) {
  }

  searchTeacher(nameTeacher: any, statusTeacher: any, request: any): Observable<any> {
    const params = request;

    return this.httpClient.get<any>('http://localhost:8080/teachers?name=' + nameTeacher + '&status=' + statusTeacher, {params});

  }

  getPageTeacher(teacherToSearch: any, pageNumber: any): Observable<PageTeacher> {
    return this.httpClient.post<PageTeacher>(this.URL_API_TEACHER + '/search?page=' + pageNumber, teacherToSearch);
  }


}
