import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Teacher} from '../entity/teacher/teacher';

  const TEACHER_URL = 'http://localhost:8080/api/clazz/teacher/';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private API_URL = 'http://localhost:8080/api/clazz';

  constructor(private httpClient: HttpClient) {
  }

  getAllTeacherList(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.API_URL+'/teacher');
  }

  getAllTeacher(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(TEACHER_URL)
  }
}
