import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { ConfirmComponent } from './confirm/confirm.component';
import {LoginComponent} from "./login/login.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent, ConfirmComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule
  ]
})
export class SecurityModule { }
