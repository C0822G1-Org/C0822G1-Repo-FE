import {Component, Input, OnInit} from '@angular/core';
import {AccountDto} from '../../entity/account-dto/account-dto';
import {ChangePassService} from '../../service/change-pass/change-pass.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {StudentService} from "../../service/student/student.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  account: AccountDto = {};
  changePassForm: FormGroup = new FormGroup({
    newPass: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(30)]),
    confirmPass: new FormControl('', Validators.required)
  }, {});

  constructor(private studentService: StudentService,
              private changePassService: ChangePassService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
  }

  changePass() {
    const idAccount = this.tokenService.getIdAccount();
    // @ts-ignore
    this.account.accountId = idAccount;
    this.account.newPass = this.changePassForm.value.newPass;
    this.changePassService.changePass(this.account).subscribe(
      // @ts-ignore
      this.router.navigateByUrl('/'),
      // this.toastr.success('Bạn đã đổi mật khẩu thành công ^.^ ', 'Alo có thông báo!')
    )
    ;
    console.log(this.account);

  }
}

