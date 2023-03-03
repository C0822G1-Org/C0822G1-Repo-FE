import {Component, Input, OnInit} from '@angular/core';
import {AccountDto} from '../../entity/account-dto/account-dto';
import {ChangePassService} from '../../service/change-pass/change-pass.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private changePassService: ChangePassService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(data =>{
      const id = data.get('id');
      // this.changePassService.f
    })
  }

  ngOnInit(): void {
  }

  changePass() {

    this.account.accountId = 1;
    this.account.newPass = this.changePassForm.value.newPass;
    this.changePassService.changePass(this.account).subscribe(
      // @ts-ignore
      this.router.navigateByUrl('/'),
      alert('Bạn đã đổi mật khẩu thành công!'),
    )
    ;
    console.log(this.account);

  }
}
