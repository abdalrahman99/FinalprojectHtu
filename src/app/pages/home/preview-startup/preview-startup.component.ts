import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startup/startups.service';

@Component({
  selector: 'app-preview-startup',
  templateUrl: './preview-startup.component.html',
  styleUrls: ['./preview-startup.component.css']
})
export class PreviewStartupComponent implements OnInit {
  arrayStartup:any ;
  constructor(
    private _startupService: StartupsService
  ){}

  ngOnInit(): void {
        this.getAllData();
  }

  getAllData() {
    this._startupService.getAll().subscribe((result) => {
      if (result) {
        this.arrayStartup = result;
        console.log(result);
      }
    });
  }

}
