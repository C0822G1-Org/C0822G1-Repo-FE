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

  //  getPageNotifications(searchNotification: any, pageNumber: any, recordPerPage: any): Observable<PageNotificationDto> {
  //     return this.httpClient.post<PageNotificationDto>(this.URL_API_NOTIFICATION +
  //       '/search?page=' + pageNumber + '&size=' + recordPerPage, searchNotification);
  //   }
  getPageStudent(studentToSearch: any, pageNumber: any): Observable<PageStudentDto> {
    return this.httpClient.post<PageStudentDto>(this.URL_API_STUDENT +
      '/search?page=' + pageNumber, studentToSearch);
  }
}
