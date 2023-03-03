import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Clazz} from '../../entity/student/clazz';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../../service/student.service';
import {ClazzService} from '../../service/clazz.service';
import {finalize} from 'rxjs/operators';
import {Student} from '../../entity/student/student';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  studentForm: FormGroup;
  clazz:Clazz={};
  selectedImage: any = null;
  student:Student={};

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private studentService: StudentService,
              private clazzService: ClazzService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = Number(data.get('id'));
      this.clazzService.findById(id).subscribe(data=>{
        this.clazz=data;
        console.log(this.clazz);
        if (data!=null){
          this.student={clazz:this.clazz};
          console.log(this.student);
        }
      })
    });
    this.studentForm = new FormGroup({
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
    this.studentForm.patchValue(this.student);
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // tslint:disable-next-line:typedef
  createStudent() {
    // console.log(this.clazz);
    console.log(this.studentForm.value);
    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.studentForm.patchValue({img: url});
          // Call API to create vaccine
          this.student=this.studentForm.value;
          this.student.clazz=this.clazz;
          console.log(this.student);
          this.studentService.saveStudent(this.student).subscribe(() => {
            alert('Thêm mới thành công');
            this.router.navigateByUrl('');
          });
        });
      })
    ).subscribe();
  }

}
