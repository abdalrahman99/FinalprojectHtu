import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { HeaderModule } from 'src/app/core/components/layout/header/header.module';
import { RouterModule } from '@angular/router';
import { StartupComponent } from './startup/startup.component';
import { PreviewStartupComponent } from './preview-startup/preview-startup.component';
// import{ HomeRoutingModule} from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    StartupComponent,
    PreviewStartupComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    // HomeRoutingModule

  ]
})
export class HomeModule { }
