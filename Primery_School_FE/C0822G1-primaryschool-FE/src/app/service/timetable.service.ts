import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {Itimetable} from "../entity/timtable-dto/itimetable";
import {Subject} from "../entity/timtable-dto/subject";


@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Create by : NamHH
   * Date created: 01/03/2023
   * Function: get all timetable
   *
   * @Return error if result is error or get list subject if result is not error
   */
  findAllTimetable(): Observable<Itimetable[][]> {
    return this.httpClient.get<Itimetable[][]>("http://localhost:8080//api/timetable/listTimetable/" + 2);
  }


  /**
   * Create by : NamHH
   * Date created: 01/03/2023
   * Function: get all subject
   *
   * @Return error if result is error or get list subject if result is not error
   */
  findAllSubject(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>("http://localhost:8080//api/timetable/listSubject");
  }
}
