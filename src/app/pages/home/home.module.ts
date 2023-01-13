import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { HeaderModule } from 'src/app/core/components/layout/header/header.module';
import { RouterModule } from '@angular/router';
import { StartupComponent } from './startup/startup.component';
import { PreviewStartupComponent } from './preview-startup/preview-startup.component';
import { AppRoutingModule } from './home-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';

const MatImport=[
  MatCardModule,
  MatButtonModule,
  MatIconModule,
]

@NgModule({
  declarations: [
    HomeComponent,
    StartupComponent,
    PreviewStartupComponent,
    MainComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    AppRoutingModule,
    ...MatImport
  ]
})
export class HomeModule { }
