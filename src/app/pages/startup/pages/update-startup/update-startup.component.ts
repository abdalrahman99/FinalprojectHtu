import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startup/startups.service';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-update-startup',
  templateUrl: './update-startup.component.html',
  styleUrls: ['./update-startup.component.css'],
})
export class UpdateStartupComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  imgSrc: any;
  key: string = '';
  listOfSectors: any[] = [];
  subscribe!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _startupService: StartupsService,
    private _uploadService: UploadService,
    private location: Location,
    private formBulider: FormBuilder,
    private _sectorService: SectorsService
  ) {
    this.formGroup = this.formBulider.group({
      city: null,
      emailAddress: [null, [Validators.email, Validators.required]],
      logo: null,
      name: [null, [Validators.required]],
      numberOfEmployees: null,
      sectors: [null, [Validators.required]],
      websiteUrl: [null, [Validators.required]],
      yearOfEstablishment: null,
    });
  }
  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    console.log('done unsubscribe');
  }

  getAllSectors() {
    this.subscribe = this._sectorService.getAll().subscribe((result) => {
      if (result) {
        this.listOfSectors = result;
      }
    });
  }
  ngOnInit(): void {
    this.subscribe = this.activatedRoute.queryParams.subscribe((result) => {
      if (result['key']) {
        this.key = result['key'];
        this.getById();
      }
    });
    this.getAllSectors();
  }

  getById() {
    this.subscribe = this._startupService
      .getById(this.key)
      .subscribe((result: any) => {
        this.formGroup = this.formBulider.group({
          city: result['city'],
          emailAddress: [
            result['emailAddress'],
            [Validators.email, Validators.required],
          ],
          logo: result['logo'],
          name: [result['name'], [Validators.required]],
          numberOfEmployees: result['numberOfEmployees'],
          sectors: [result['sectors'], [Validators.required]],
          websiteUrl: [result['websiteUrl'], [Validators.required]],
          yearOfEstablishment: result['yearOfEstablishment'],
        });
        this.imgSrc = result['logo'];
      });
  }

  getErrorMessage(control: any) {
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'You must enter a value ';
      }
      if (control.hasError('email')) {
        return 'Not a valid email ';
      }
    }
    return '';
  }

  onUpdateCliked() {
    if (this.formGroup.invalid) {
      this.validaterFormGroup();
    } else {
      if (this.formGroup.controls['logo'].value) {
        this.upload();
      } else {
        this.updateStartup();
      }
    }
  }

  validaterFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  upload() {
    this.subscribe = this._uploadService
      .upload(this.formGroup.controls['logo'].value)
      .subscribe((file) => {
        if (file?.metadata) {
          this.getDownloadURL();
        }
      });
  }

  getDownloadURL() {
    this.subscribe = this._uploadService.getDownloadURL().subscribe((url) => {
      console.log();
      this.formGroup.controls['logo'].setValue(url);
      this.updateStartup();
    });
  }

  updateStartup() {
    this._startupService
      .update(this.key, {
        name: this.formGroup.controls['name'].value,
        emailAddress: this.formGroup.controls['emailAddress'].value,
        websiteUrl: this.formGroup.controls['websiteUrl'].value,
        sectors: this.formGroup.controls['sectors'].value,
        city: this.formGroup.controls['city'].value,
        numberOfEmployees: this.formGroup.controls['numberOfEmployees'].value,
        logo: this.formGroup.controls['logo'].value,
        yearOfEstablishment:
          this.formGroup.controls['yearOfEstablishment'].value,
      })
      .then(() => {
        this.location.back();
      });
  }

  onFileInputChange($event: any) {
    console.log($event);

    this.formGroup.controls['logo'].setValue($event.target.files[0]);

    //file data Url storge
    const reader = new FileReader();
    reader.readAsDataURL(this.formGroup.controls['logo'].value);
    reader.onload = (e) => (this.imgSrc = reader.result);
  }
}
