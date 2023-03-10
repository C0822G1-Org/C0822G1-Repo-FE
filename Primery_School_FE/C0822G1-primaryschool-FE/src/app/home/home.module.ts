import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BodyComponent} from './body/body.component';
import { DetailComponent } from './detail/detail.component';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, BodyComponent, DetailComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    BodyComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

  ]
})
export class HomeModule {
}
