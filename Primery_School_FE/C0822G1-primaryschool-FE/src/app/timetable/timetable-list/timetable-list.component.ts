import {Component, OnInit} from '@angular/core';

import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Subject} from "../../entity/timtable-dto/subject";
import {Itimetable} from "../../entity/timtable-dto/itimetable";
import {TimetableUpdate} from "../../entity/timtable-dto/timetable-update";
import {TimetableClazz} from "../../entity/timtable-dto/timetable-clazz";
import {TimetableService} from "../../service/time_table/timetable-service.service";

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit {
  clazzList: TimetableClazz[] = [];
  clazzSearchId: TimetableClazz = {};
  selectedSubject: TimetableUpdate[] = [];
  clazzIdSearch: number = 0;

  time: any[] = [];
  subjects: Subject[] = [];
  timetables: Itimetable[] = [];

  constructor(private timetableService: TimetableService) {
  };


  public timetableForm: FormGroup = new FormGroup({});
  public timetableArray: FormArray = new FormArray([]);
  selectName: any;

  ngOnInit() {
    this.timetableForm = new FormGroup({
      timetableArray: new FormArray([])
    });

    this.timetableArray = this.timetableForm.controls.timetableArray as FormArray;


    /**
     * Create by NamHH
     * Date 28/03/2023
     * Function: Call function findAllSubject
     **/
    this.findAllSubject();

  }


  /**
   * Create by NamHH
   * Date 28/03/2023
   * Function: findAllSubject
   **/
  findAllSubject() {
    this.timetableService.findAllSubject().subscribe(next => {
      console.log(next);
      this.subjects = next;
    }, error => {
    })
  }


  /**
   * Create by NamHH
   * Date 01/03/2023
   * Function: update timetable where id_timetable
   **/
  update() {
    const selectedValues = [];
    // Lặp qua từng control trong FormGroup để lấy giá trị
    for (const control of this.timetableArray.controls) {
      const value = {
        timetableId: parseInt(control.get('timetableId')?.value),
        subjectId: parseInt(control.get('subjectId')?.value),
      };
      selectedValues.push(value);
    }
    console.log(selectedValues);
    this.timetableService.update(selectedValues).subscribe(next => {
    }, error => {
      alert("Thất bại")
    })
  }

  /**
   * Create by NamHH
   * Date 28/03/2023
   * Function: findAllSubject
   **/
  searchTimetable(clazzId: string) {
    console.log(clazzId);
    this.clazzIdSearch = parseInt(clazzId);
    this.timetableService.findAllTimetable(parseInt(clazzId)).subscribe(next => {
      this.timetables = next;
      this.timetables.forEach(next => {
        const groupH = new FormGroup({
          timetableId: new FormControl(next.timetableId),
          subjectId: new FormControl(next.subjectId),
          subjectName: new FormControl(next.subjectName),
          clazzId: new FormControl(next.clazzId),
          clazzName: new FormControl(next.clazzName)
        })
        this.timetableArray.push(groupH);
      })
      console.log(this.timetableArray);

    }, error => {
      alert("Không có danh sách");
    })
    this.timetableArray.clear();
  }


  /**
   * Create by NamHH
   * Date 01/03/2023
   * Function: showClazz
   **/
  showClazz() {
    this.timetableService.showClazz(this.clazzIdSearch).subscribe(next => {
      this.clazzSearchId = next;
      console.log(this.clazzIdSearch)
    }, error => {
    })
  }

  chooseClass(bockId: string) {
    this.timetableService.showListClazz(parseInt(bockId)).subscribe(next => {
      this.clazzList = next
    }, error => {
      alert("Không có danh sách");
      console.log(error);
    })
  }
}
