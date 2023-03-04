import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClazzYear} from '../entity/clazz/clazz-year';
import {ClazzName} from '../entity/clazz/clazz-name';
import {ClazzTeacher} from '../entity/clazz/clazz-teacher';
import {ClazzTeacherEdit} from '../entity/clazz/clazz-teacher-edit';
import {TeacherInfo} from '../entity/teacher/teacher-info';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  URL_STUDENT_LIST="http://localhost:8080/api/students/list";
  URL_STUDENT="http://localhost:8080/api/students";
  URL_STUDENT_CLAZZ="http://localhost:8080/api/students/clazz";
  URL_STUDENT_EDIT_TEACHER="http://localhost:8080/api/students/edit-teacher";
  URL_STUDENT_TEACHER_NAME_LIST="http://localhost:8080/api/students/teacher-name-list";
  URL_STUDENT_TEACHER_NAME="http://localhost:8080/api/students/teacher-name";

  constructor(private httpClient:HttpClient) { }

  getListStudent(year: string, clazzId: string,page:number):Observable<any> {
    return this.httpClient.get<any>(this.URL_STUDENT_LIST+'?year='+year+'&clazzId='+clazzId+'&page='+page);
  }

  getListYear():Observable<ClazzYear[]>{
    return this.httpClient.get<ClazzYear[]>(this.URL_STUDENT+'/year');
  }

  getNameClass(year: string, block: string):Observable<ClazzName[]> {
    return this.httpClient.get<ClazzName[]>(this.URL_STUDENT+'?year='+year+'&name='+block);
  }

  getClazzTeacher(year: string, clazzId: string):Observable<ClazzTeacher> {
    return this.httpClient.get<ClazzTeacher>(this.URL_STUDENT_CLAZZ+'?year='+year+'&clazzId='+clazzId);
  }

  editTeacher(clazzTeacherEdit:ClazzTeacherEdit) {
    return this.httpClient.put(this.URL_STUDENT_EDIT_TEACHER+'/'+clazzTeacherEdit.clazzId,clazzTeacherEdit);
  }

  getListNameTeacher(currentYear: number):Observable<TeacherInfo[]> {
    return this.httpClient.get<TeacherInfo[]>(this.URL_STUDENT_TEACHER_NAME_LIST+'?year='+currentYear);
  }

  getNameTeacher(idCard: string,year:number):Observable<TeacherInfo> {
    return this.httpClient.get<TeacherInfo>(this.URL_STUDENT_TEACHER_NAME+'?idCard='+idCard+'&year='+year);
  }

  deleteStudent(id: any) {
    return this.httpClient.delete(this.URL_STUDENT+'/'+id);
  }
}
