import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Clazz} from '../../entity/student/clazz';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {StudentService} from '../../service/student.service';
import {ClazzService} from '../../service/clazz.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  studentForm: FormGroup;
  clazz: Clazz[] = [];
  selectedImage: any = null;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private studentService: StudentService,
              private clazzService: ClazzService) {
    this.studentForm = new FormGroup({
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
    this.clazzService.getAll().subscribe(next => {
      this.clazz = next;
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  // createStudent() {
  //   if (this.studentForm.valid) {
  //     const student = this.studentForm.value;
  //     this.studentService.saveStudent(student).subscribe(next => {
  //       alert('Thêm mới thành công');
  //       this.router.navigateByUrl('');
  //     });
  //   }
  // }

  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // tslint:disable-next-line:typedef
  createStudent() {
    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.studentForm.patchValue({img: url});
          // Call API to create vaccine
          this.studentService.saveStudent(this.studentForm.value).subscribe(() => {
            alert('Thêm mới thành công');
            this.router.navigateByUrl('');
          });
        });
      })
    ).subscribe();
  }

}
