import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/authentication/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../../service/authentication/security.service';
import {ShareService} from '../../service/authentication/share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  roles: string[] = [];
  returnUrl = "/";

  formGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(false)
  });

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private securityService: SecurityService,
              private shareService: ShareService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/body';

    if (this.tokenStorageService.getToken()) {
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getRole();
      const username = this.tokenStorageService.getUsername();
    }
  }

  login() {
    this.securityService.login(this.formGroup.value).subscribe(
      data => {
        console.log(data);
        if (this.formGroup.value.rememberMe) {
          this.tokenStorageService.saveTokenLocal(data.token);
          this.tokenStorageService.saveUserLocal(data.email, data.id, data.username, data.name, data.roles, data.avatar);
        } else {
          this.tokenStorageService.saveTokenSession(data.token);
          this.tokenStorageService.saveUserSession(data.email, data.id, data.username, data.name, data.roles, data.avatar);
        }

        this.securityService.setIsLoggedIn(true);
        const  username = this.tokenStorageService.getUsername();
        this.roles = this.tokenStorageService.getRole();
        console.log(username);
        console.log(this.roles);
        this.formGroup.reset();
        this.router.navigateByUrl("/body");
        this.shareService.sendClickEvent();

      },
      error => {
        this.errorMessage = error.error.message;

        this.securityService.isLoggedIn = false;

      }
    );
  }
}
