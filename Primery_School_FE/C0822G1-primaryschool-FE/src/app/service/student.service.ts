import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/student/clazz';
import {Student} from '../entity/student/student';

    const STUDENT_URL = 'http://localhost:8080/api/clazz/student/';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient : HttpClient) {}

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
