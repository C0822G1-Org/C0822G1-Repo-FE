import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/student/clazz';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private API_URL = 'http://localhost:8080/api/class';

  constructor(private _httpClient: HttpClient) {
  }

  saveClass(c: any): Observable<Clazz> {
    return this._httpClient.post<Clazz>(this.API_URL+'/save',c);
  }
}
