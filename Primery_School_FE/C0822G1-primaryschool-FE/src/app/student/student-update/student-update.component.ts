import {Component, Inject, OnInit} from '@angular/core';
import {Student} from '../../entity/student/student';
import {Clazz} from '../../entity/student/clazz';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {ClazzService} from '../../service/clazz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  student: Student = {};
  studentId: any;
  clazz: Clazz | undefined = {};
  formUpdateStudent: FormGroup = new FormGroup({});
  selectedImage: any;
  src: string | undefined;
  downloadURL: Observable<string> | undefined;

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.formUpdateStudent = new FormGroup({
      studentId: new FormControl(),
      img: new FormControl('', [Validators.required]),
      studentName: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('true', [Validators.required]),
      fatherName: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      phoneNumberFather: new FormControl('', [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      fatherJob: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      motherName: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      phoneNumberMother: new FormControl('', [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      motherJob: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      religion: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      address: new FormControl('', [Validators.required]),
      clazz: new FormGroup({
        clazzId:new FormControl(),
        clazzName:new FormControl()
      })
    });

    this.activatedRoute.paramMap.subscribe(data => {
      // const id = data.get('studentId');
      this.studentId = this.activatedRoute.snapshot.paramMap.get('studentId');
      console.log(this.studentId);
      if (this.studentId != null) {
        // this.getStudent(+id);
        // tslint:disable-next-line:radix no-shadowed-variable
        this.studentService.findById(this.studentId).subscribe(data => {
          if (data!=null){
            this.student = data;
            console.log(this.student);
            this.clazz=this.student.clazz;
            console.log(this.clazz);
            this.formUpdateStudent.patchValue(this.student);
            console.log(this.formUpdateStudent);
          }

        });
      }

    });
  }

  ngOnInit(): void {

  }


  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    var n = Date.now();
    // Nơi lưu
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              // lấy lại url
              this.student.img = url;
            }
            this.src = url;
            console.log('link', this.student.img);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // in url ra
          console.log('url :', url);
        }
      });
  }

  // tslint:disable-next-line:typedef
  updateStudent() {
    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    if (this.selectedImage == null){
      this.student=this.formUpdateStudent.value
      this.studentService.updateStudent(this.student).subscribe(() => {
        alert('Sửa mới thành công');
        this.router.navigateByUrl('');
      });
    }else {
      const nameImg = this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formUpdateStudent.patchValue({img: url});
            // Call API to create vaccine
            this.student=this.formUpdateStudent.value
            this.student.clazz=this.clazz;
            console.log(this.student);
            this.studentService.updateStudent(this.student).subscribe(() => {
              alert('Sửa mới thành công');
              this.router.navigateByUrl('');
            });
          });
        })
      ).subscribe();
    }
  }

}
