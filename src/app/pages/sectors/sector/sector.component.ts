import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sectors } from 'src/app/core/interfaces/sector.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    displayedColumns :String[] =['name','color','sectors','categoryName'];
    dataSource = new MatTableDataSource<Sectors>([]);
    loading=true;
    userData:any;
    subscribe!:Subscription;
    constructor(
    private router:Router,
    private _sectorsService:SectorsService,
    private _authService:AuthService
    ){}
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    console.log("done unsubscribe");

  }

  ngOnInit(): void {
    this.getuserInf()
  }
  onRowClicked(){}

  getuserInf(){
    this.subscribe = this._authService.userInf.subscribe((user)=>{
      this.userData = user;
      console.log(this.userData );
      if(this.userData.role){
        if(this.userData.role === 'admin'){
            this.displayedColumns.push('action')
        }
        this.getAllData();
      }
    })
  }

  getAllData(){
    this.subscribe = this._sectorsService.getAll().subscribe((result:any)=>{
      if(result){
      this.dataSource =new MatTableDataSource(result);
      console.log(result);
      this.dataSource.paginator =this.paginator;
      this.dataSource._updateChangeSubscription();
      this.loading=false;
    }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddClicked(){
     this.router.navigate(['/sectors/create-sectors']);
  }

  onEditCliked(row:Sectors){
    this.router.navigate(['/sectors/edit-sectors'],{
     queryParams:{
       key:row.key,
     }
    })
   }

  onDeleteRowClicked(row:Sectors){
    this._sectorsService.delete(row.key).then(()=>{
     window.alert('Deleted sucessfull');
    });
 }


}
