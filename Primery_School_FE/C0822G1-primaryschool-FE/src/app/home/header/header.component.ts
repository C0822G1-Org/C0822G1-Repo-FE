import {Component, HostListener, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {TokenStorageService} from '../../service/authentication/token-storage.service';
import {ShareService} from '../../service/authentication/share.service';
import {SecurityService} from '../../service/authentication/security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageYoffSet: number = 0;
  isLoggedIn: any;
  user: any;


  constructor(private scroll: ViewportScroller, private tokenStorageService: TokenStorageService, private securityService: SecurityService, private router: Router) {
    this.securityService.getIsLoggedIn().subscribe(v => {
      console.log('come here: ', v);
      this.isLoggedIn = v;
    });
    this.securityService.getUserLoggedIn().subscribe(next => {
      this.user = next;
    });
  }

  ngOnInit(): void {
  }
@HostListener('window:scroll', ['$event']) onScroll(){
    this.pageYoffSet = window.pageYOffset;
}


  scrollToTop() {
    this.scroll.scrollToPosition([0,0])
  }

  logout() {
    this.tokenStorageService.logout();
    this.securityService.isLoggedIn = false;
    this.securityService.setIsLoggedIn(null, false);
    this.router.navigateByUrl('/login');
  }
}
