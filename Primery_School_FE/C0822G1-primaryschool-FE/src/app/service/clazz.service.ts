import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClazzService {


  constructor(private httpClient: HttpClient) {
  }
  /**
   * Hoang NM
   * Date created: 3/2/2023
   */
  URL_CLAZZ_LIST = 'http://localhost:8080/api/clazz';
  findById(id: number): Observable<any>{
    return this.httpClient.get<any>(this.URL_CLAZZ_LIST + '/info/' +id);
  }
}
