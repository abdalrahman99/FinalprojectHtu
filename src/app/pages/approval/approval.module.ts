import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval/approval.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const MatImport=[
  MatInputModule,
  MatPaginatorModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatSelectModule,
]

@NgModule({
  declarations: [
    ApprovalComponent
  ],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...MatImport
  ]
})
export class ApprovalModule { }
