import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/authentication/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private router: Router,
              private tokenStorageService:TokenStorageService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenStorageService.getToken()) {
      if (JSON.stringify(this.tokenStorageService.getRole()) === JSON.stringify(['TEACHER'])) {
        return true;
      } else if (JSON.stringify(this.tokenStorageService.getRole()) === JSON.stringify(['ADMIN'])) {
        return true;
      } else {
        alert('Bạn không đủ quyền, vui lòng đăng nhập để tiếp tục.');
        this.router.navigateByUrl('');
        return false;
      }
    } else {
      this.router.navigateByUrl('/authentication/login');
      return false;
    }
  }

}
