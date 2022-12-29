import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorComponent } from './sector/sector.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CreateSectorsComponent } from './sector/pages/create-sectors/create-sectors.component';
import { EditSectorsComponent } from './sector/pages/edit-sectors/edit-sectors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MatImport=[
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    SectorComponent,
    CreateSectorsComponent,
    EditSectorsComponent
  ],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...MatImport
  ]
})
export class SectorsModule { }
