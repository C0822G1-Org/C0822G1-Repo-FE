import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog} from '../entity/blog/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) {
  }

  URL_BLOG = ('http://localhost:8080/blog');

  getAll(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(this.URL_BLOG);
  }

  getAllPage(page: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_BLOG + '?' + 'page=' + page);
  }
  findById(id: number){
    return this.httpClient.get(this.URL_BLOG + '/' + id)
  }

  detail(id: number) {
    return this.httpClient.get(this.URL_BLOG + '/detail' + id);
  }
}
