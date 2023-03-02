import {Component, OnInit} from '@angular/core';
import {Student} from '../../entity/student/student';
import {Clazz} from '../../entity/student/clazz';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {ClazzService} from '../../service/clazz.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  student: Student = {};
  studentId: any;
  clazz: Clazz[] = [];
  formUpdateStudent: FormGroup = new FormGroup({});

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.formUpdateStudent = new FormGroup({
      studentId: new FormControl(),
      img: new FormControl('', [Validators.required]),
      studentName: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z\',.-]+( [a-zA-Z\',.-]+)*){2,30}')]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('true', [Validators.required]),
      fatherName: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z\',.-]+( [a-zA-Z\',.-]+)*){2,30}')]),
      phoneNumberFather: new FormControl('', [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      fatherJob: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z\',.-]+( [a-zA-Z\',.-]+)*){2,30}')]),
      motherName: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z\',.-]+( [a-zA-Z\',.-]+)*){2,30}')]),
      phoneNumberMother: new FormControl('', [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      motherJob: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z\',.-]+( [a-zA-Z\',.-]+)*){2,30}')]),
      religion: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z\',.-]+( [a-zA-Z\',.-]+)*){2,30}')]),
      address: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z\',.-]+( [a-zA-Z\',.-]+)*){2,30}')]),
      clazz: new FormControl()
    });

    this.activatedRoute.paramMap.subscribe(data => {
      // const id = data.get('studentId');
      this.studentId = this.activatedRoute.snapshot.paramMap.get('studentId');
      console.log(this.studentId);
      if (this.studentId != null) {
        // this.getStudent(+id);
        // tslint:disable-next-line:radix no-shadowed-variable
        this.studentService.findById(this.studentId).subscribe(data => {
          this.student = data;
          this.formUpdateStudent.patchValue(this.student);
        });
      }

    });
  }

  ngOnInit(): void {
    this.getAllClazz();
  }

  // getStudent(id: number): void {
  //   this.studentService.findById(id).subscribe(data => {
  //     this.formUpdateStudent.patchValue(data);
  //     this.student = data;
  //   });
  // }

  getAllClazz(): void {
    this.clazzService.getAll().subscribe(next => {
      this.clazz = next;
    }, error => {
    });
  }

  updateStudent(): void {
    if (this.formUpdateStudent.valid) {
      this.studentService.updateStudent(this.formUpdateStudent.value).subscribe(data => {
        if (data != null) {
          alert('Chỉnh sửa không thành công');
        } else {
          alert('Chỉnh sửa  thành công');
          this.router.navigateByUrl('');
        }
      }, error => {
      });
    }
  }


  // tslint:disable-next-line:typedef
  compareFun(item1: { id: any; }, item2: { id: any; }) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

}
