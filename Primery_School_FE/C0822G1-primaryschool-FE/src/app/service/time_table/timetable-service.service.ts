import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TimeTableView} from '../../dto/time_table/time-table-view';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  URL_TIME_TABLE_BY_TEACHER = 'http://localhost:8080/api/time-table';

  constructor(private httpClient: HttpClient) {

  }

  /**
   * Create by: VanNTC
   * Date created: 01/03/2023
   * Function: get timetable by id teacher
   */

  getTimeTableByIdTeacher(idTeacher: number):Observable<TimeTableView[][]>{
    return this.httpClient.get<TimeTableView[][]>(`${this.URL_TIME_TABLE_BY_TEACHER}/${idTeacher}`);
  }
}
