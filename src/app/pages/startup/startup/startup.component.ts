import { Component,OnInit, ViewChild ,OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StartupsService } from 'src/app/core/services/startup/startups.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource=new MatTableDataSource<Startup>([]);
  displayedColumns =['name','emailAddress','sectors','city'];
  userData:any;
  listOfSectors:any[]=[];
  loading= true;
  constructor(
    private _startupServices:StartupsService,
    private router:Router,
    private _authService:AuthService,
    ){ }

    //unsubscribe ngOnDestroy
    ngOnDestroy(): void {
    }

  ngOnInit(): void {

    this.getuserInf();

  }
  getuserInf(){
    this._authService.userInf.subscribe((user)=>{
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
    this._startupServices.getAll().subscribe((result:any)=>{
      if(result){
      this.dataSource =new MatTableDataSource(result);
      console.log(result);
      this.dataSource.paginator =this.paginator;
      this.dataSource._updateChangeSubscription();
      this.loading=false;
    }
    })
  }

   applyFilter($event:any){
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEditCliked(row:Startup){
   this.router.navigate(['/startup/update-startup'],{
    queryParams:{
      key:row.key,
    }
   })
  }

  onDeleteCliked(row:Startup){
   this._startupServices.delete(row.key).then(()=>{
    window.alert('Deleted sucessfull');
   });
}

onAddCliked(){
  this.router.navigate(['/startup/add-startup']);
}

onRowCliked(row:Startup){
  this.router.navigate(['/startup/preview-startup'],{
    queryParams:{
      key:row.key,
    }
   })
}

onRequestNewStartup(){
  this.router.navigate(['/startup/request-startup'])
}

}

