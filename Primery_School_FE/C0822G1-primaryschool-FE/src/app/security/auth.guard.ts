import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/authentication/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService:TokenStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token =  this.tokenStorageService.getToken();
    if(token!==null){
      let role = this.tokenStorageService.getRole()
      if(route.data.roles.indexOf(role) === -1){
        this.router.navigate(['authentication/login'], {
          queryParams: { returnUrl: state.url }});
        return false;
      }
      return true;
    }
    this.router.navigate(['authentication/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
