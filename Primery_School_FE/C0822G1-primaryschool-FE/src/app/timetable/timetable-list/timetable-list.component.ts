import {Component, OnInit} from '@angular/core';
import {TimetableService} from "../../service/timetable.service";

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit {
  timetables: any[] = [];

  constructor(private timetableService: TimetableService) {
    this.findAllTimetable();
  }

  ngOnInit(): void {
  }

  findAllTimetable() {
    this.timetableService.findAllTimetable().subscribe(next => {
      console.log(next);
      this.timetables = next;
    }, error => {
      alert("Không có danh sách");
    })
  }

}
