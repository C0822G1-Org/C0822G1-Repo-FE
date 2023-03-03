import {Component, OnInit} from '@angular/core';
import {ChangePassService} from '../../service/change-pass/change-pass.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountDto} from '../../entity/account-dto/account-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup = new FormGroup({
    newPass: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(30),Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()-_=+{}[\\]|;:'\",.<>/?]).{9,}$")]),
    confirmPass: new FormControl('', Validators.required)
  }, {});
  account: AccountDto = {};

  constructor(private changePassService: ChangePassService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  // checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  //   // @ts-ignore
  //   const password = group.get('password').value;
  //   // @ts-ignore
  //   const confirmPassword = group.get('confirmPassword').value;
  //   return password === confirmPassword ? null : {notSame: true};
  // }

  /**
   * Created by: NuongHT
   * Date created: 01/03/2023
   * Content: check password equal confirm password, function 'changePassword()' send value accountId -> spring boot : change pass database
   *
   */

get contactFormValue() {
    return this.changePassForm.controls;
  }

  onPasswordChange() {
    if (this.contactFormValue.confirmPass.value == this.contactFormValue.newPass.value) {
      this.contactFormValue.confirmPass.setErrors(null);
    } else {
      this.contactFormValue.confirmPass.setErrors({'mismatch': true});
    }
  }

  // tslint:disable-next-line:typedef
  // changePass() {
  //   this.account.accountId = 1;
  //   this.account.newPass = this.changePassForm.value.newPass;
  //   this.changePassService.changePass(this.account).subscribe(
  //     // @ts-ignore
  //     this.router.navigateByUrl('/')
  //   );
  //   console.log(this.account);
  // }
}
