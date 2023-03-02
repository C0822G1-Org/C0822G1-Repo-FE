import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  URL_CLAZZ_LIST = 'http://localhost:8080/api/clazz';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.URL_CLAZZ_LIST);
  }
}
