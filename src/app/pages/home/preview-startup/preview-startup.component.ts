import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startup/startups.service';

@Component({
  selector: 'app-preview-startup',
  templateUrl: './preview-startup.component.html',
  styleUrls: ['./preview-startup.component.css']
})
export class PreviewStartupComponent implements OnInit, OnDestroy {
  key: string = '';
  startup: Startup = {
    emailAddress: '',
    name: '',
    sectors: [],
    websiteUrl: '',
  };
  subscribe!: Subscription;

  constructor(
    private activatedRoute:ActivatedRoute,
    private _startupService: StartupsService
  ) {}
  ngOnDestroy(): void {

  }

  ngOnInit(): void {

    this.subscribe = this.activatedRoute.queryParams.subscribe((result) => {

      if (result['key']) {
        this.key = result['key'];
        this.getById();
      }
    });

  }

  getById() {
    this._startupService
      .getById(this.key)
      .subscribe((result: any) => {
        if (result) {
          this.startup = result;


        }
      });
  }
}
