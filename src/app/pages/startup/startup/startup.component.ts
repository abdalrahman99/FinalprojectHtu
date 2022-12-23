import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource=new MatTableDataSource<Startup>([]);
  displayedColumns =['name','emailAddress','sectors','city','action'];

  constructor(
    private _startupServices:StartupsService,
    private router:Router,
    ){ }

  ngOnInit(): void {
   this.getAllData();
  }

  getAllData(){
    this._startupServices.getAll().subscribe((result:any)=>{
      this.dataSource =new MatTableDataSource(result);
      this.dataSource.paginator =this.paginator;
      this.dataSource._updateChangeSubscription();
    })
  }

   applyFilter($event:any){
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddCliked(){
      this.router.navigate(['/startup/add-startup']);
  }
}

