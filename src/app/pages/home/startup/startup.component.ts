import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StartupsService } from 'src/app/core/services/startup/startups.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
})
export class StartupComponent implements OnInit {
  loading = true;
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
  onPreviewClicked() {
    this.router.navigate(['/home/preview-startup']);
  }
}
