import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Teacher} from '../entity/teacher/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private API_URL = 'http://localhost:8080/api/clazz';

  constructor(private _httpClient: HttpClient) {
  }

  getAllTeacherList(): Observable<Teacher[]> {
    return this._httpClient.get<Teacher[]>(this.API_URL+'/teacher');
  }
}
