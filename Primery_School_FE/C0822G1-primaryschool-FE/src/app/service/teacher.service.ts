import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Teacher} from "../entity/teacher/teacher";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) {
  }

  findByTeacherId(teacherId: number): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>('http://localhost:8080/api/teacher/' + teacherId)
  }

  editInfoTeacher(teacher: Teacher) {
    alert("dang sữa")
    return this.httpClient.put('http://localhost:8080/api/teacher/editInfoTeacher/', teacher)
  }
}
