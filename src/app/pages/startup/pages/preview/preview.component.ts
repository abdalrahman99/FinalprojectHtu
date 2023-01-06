import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartupsService } from 'src/app/core/services/startup/startups.service';
import { OnInit } from '@angular/core';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit, OnDestroy {
  key: string = '';
  subscribe!: Subscription;
  startup: Startup = {
    emailAddress: '',
    name: '',
    sectors: [],
    websiteUrl: '',
  };

  loading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _startupService: StartupsService
  ) {}
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    console.log('done subscribe');
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
    this.subscribe = this._startupService
      .getById(this.key)
      .subscribe((result: any) => {
        if (result) {
          this.startup = result;
          this.loading = false;
        }
      });
  }
}
