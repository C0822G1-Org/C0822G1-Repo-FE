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

  findAllTimetable(): Observable<Itimetable[]> {
    return this.httpClient.get<Itimetable[]>("http://localhost:8080/listTimetable/" + 2);
  }

  findAllSubject(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>("http://localhost:8080/listSubject");
  }
}
