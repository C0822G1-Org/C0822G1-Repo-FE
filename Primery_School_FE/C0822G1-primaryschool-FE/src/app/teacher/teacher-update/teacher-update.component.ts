import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TeacherService} from "../../service/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.css']
})
export class TeacherUpdateComponent implements OnInit {
  infoTeacherForm: FormGroup = new FormGroup({
    email: new FormControl(),
    phoneNumber: new FormControl(),
    address: new FormControl()
  })
  ;
id =1;

  constructor(private teacherService: TeacherService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(next => {
      console.log(next)
      let id = next.get('1');
      if (id != null) {
        this.teacherService.findByTeacherId(parseInt(id)).subscribe(next => {
          this.infoTeacherForm.patchValue(next);
        })
      }
    })
  }

  ngOnInit(): void {
  }

  editInfoTeacher() {
    const teacher = this.infoTeacherForm.value;
    this.teacherService.editInfoTeacher(teacher).subscribe(next => {
      alert("Sửa thông tin thành công");
      this.router.navigateByUrl("api/teacher");
    })
  }
}
