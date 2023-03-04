import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/student/clazz';

    const CLAZZ_URL = 'http://localhost:8080/api/clazz/'

@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  constructor(private httpClient : HttpClient) { }

  getAllClazz(page: number, clazzName : string): Observable<Clazz[]> {
    return this.httpClient.get<Clazz[]>(CLAZZ_URL +  `?page=` + page + `&keySearch1=` + clazzName)
  }

  getAllClazzStudent(): Observable<Clazz[]> {
    return this.httpClient.get<Clazz[]>(CLAZZ_URL)
  }

  findById(id: number){
    return this.httpClient.get<Clazz>(`${CLAZZ_URL}info/${id}`)
  }

  updateClazz(id: number, clazz: Clazz){
    return this.httpClient.put<Clazz>(`${CLAZZ_URL}update/${id}`, clazz)
  }



}
