import {Component, OnInit} from '@angular/core';
import {TimetableService} from "../../service/timetable.service";
import {Itimetable} from "../../entity/timtable-dto/itimetable";
import {Subject} from "../../entity/timtable-dto/subject";

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit {
  timetables: Itimetable[][] | undefined;
  time: any[] = [];
  subjects: Subject[] | undefined;


  constructor(private timetableService: TimetableService) {
  }

  ngOnInit() {
    this.findAllTimetable();
    this.findAllSubject()
  }


  findAllSubject() {
    this.timetableService.findAllSubject().subscribe(next => {
      console.log(next);
      this.subjects = next;
    }, error => {
    })
  }

  findAllTimetable() {
    this.timetableService.findAllTimetable().subscribe(next => {
      console.log(next);
      this.timetables = next;
      let index = 0;

      while (index < this.timetables.length) {
        this.time.push(this.timetables.slice(index, index + 5).reduce((acc, curr) => acc.concat(curr), []));
        index += 5;
      }
    }, error => {
      console.log(error);
    })
  }
}
