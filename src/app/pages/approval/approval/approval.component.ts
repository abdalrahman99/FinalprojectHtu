import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { ApprovalService } from 'src/app/core/services/approval/approval.service';
import { StartupsService } from 'src/app/core/services/startup/startups.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})

export class ApprovalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource=new MatTableDataSource<Startup>([]);
  displayedColumns =['name','emailAddress','sectors','city','action'];
  loading = true;
  key:string='';
  constructor(
    private _startupServices:StartupsService,
    private _approvalService:ApprovalService,
    private activatedRoute:ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['key'])
      {
        this.key=result['key'];
      }
    })
    this.getAllData();

  }

  getAllData() {
    this._approvalService.getAll().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource(result);
        console.log(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource._updateChangeSubscription();
         setTimeout(() => this.dataSource.paginator = this.paginator);
        this.loading = false;
      }
    });
  }

  onApprovalClicked(row:Startup){
    this._startupServices.create(row).then(()=>{
      this._approvalService.delete(row.key)
    })
  }


  onDeleteCliked(row:Startup){
    this._approvalService.delete(row.key).then(()=>{
     window.alert('Deleted sucessfull');
    });
 }

  applyFilter($event:any){
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
