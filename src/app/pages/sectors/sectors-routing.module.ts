import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSectorsComponent } from './sector/pages/create-sectors/create-sectors.component';
import { EditSectorsComponent } from './sector/pages/edit-sectors/edit-sectors.component';
import { SectorComponent } from './sector/sector.component';

const routes: Routes = [

  {path:'',redirectTo:'sectors',pathMatch:'full'},
  {path:'sectors',component:SectorComponent },
  { path:'create-sectors', component:CreateSectorsComponent},
  { path:'edit-sectors', component:EditSectorsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorsRoutingModule { }
