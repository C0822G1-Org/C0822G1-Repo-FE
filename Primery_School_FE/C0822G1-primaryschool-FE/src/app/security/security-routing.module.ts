import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ChangePasswordComponent} from './change-password/change-password.component';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'changePassword', component: ChangePasswordComponent},

  {path: 'sign-up',component: SignUpComponent}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
