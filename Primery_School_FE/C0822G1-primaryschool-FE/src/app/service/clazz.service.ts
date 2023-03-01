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

  getAllClass(page: number, clazzName : string): Observable<Clazz[]> {
    return this.httpClient.get<Clazz[]>(CLAZZ_URL +  `?page=` + page + `&keySearch1` + clazzName)
  }

}
