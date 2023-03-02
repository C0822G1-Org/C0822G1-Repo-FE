import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/student/clazz';
import {Teacher} from '../entity/teacher/teacher';

  const TEACHER_URL = 'http://localhost:8080/api/clazz/teacher/';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) {}

  getAllTeacher(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(TEACHER_URL)
  }


}
