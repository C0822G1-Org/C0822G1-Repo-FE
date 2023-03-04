import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeacherService} from "../../service/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.css']
})
export class TeacherUpdateComponent implements OnInit {

  infoTeacherForm: FormGroup = new FormGroup({
    teacherId: new FormControl(),
    teacherName: new FormControl(),
    dateOfBirth: new FormControl(),
    gender: new FormControl(),
    idCard: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.pattern('[\\w]+[@][\\w]+.[\\w]+')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(((\\\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
    address: new FormControl('', [Validators.required])
  })
  ;
  // @ts-ignore
  messageEmail: string;
  // @ts-ignore
  messagePhoneNumber: string;
  // @ts-ignore
  messageAddress: string;

  constructor(private teacherService: TeacherService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private toast: ToastrService) {
    this.activatedRoute.paramMap.subscribe(next => {
      const idAccount = parseInt(this.tokenStorageService.getIdAccount());
      if (idAccount != null) {
        this.teacherService.findByTeacherId(idAccount).subscribe(next => {
          console.log(next)
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
        this.toast.success('Cập nhật thông tin thành công', 'Thông báo', {positionClass: 'toast-top-center'})
        this.router.navigateByUrl("/teacher");
      }, error => {
        for (let i = 0; i < error.error.length; i++) {
          if(error.error[i].field === 'email') {
            this.messageEmail = error.error[i].defaultMessage
          }
          if(error.error[i].field === 'phoneNumber') {
            this.messagePhoneNumber = error.error[i].defaultMessage
          }
          if(error.error[i].field === 'address') {
            this.messageAddress = error.error[i].defaultMessage
          }
        }
      })
    }
  }

