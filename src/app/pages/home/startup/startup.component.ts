import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startup/startups.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
})
export class StartupComponent implements OnInit {

  arrayStartup:any ;
  constructor(
    private _startupServices: StartupsService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this._startupServices.getAll().subscribe((result) => {
      if (result) {
        this.arrayStartup = result;
        console.log(result);
      }
    });
  }
  onPreviewClicked(item : Startup)  {
    this.router.navigate(['/home/preview-startup'],{
      queryParams: {
        key: item.key,
      },

  })

}
}
