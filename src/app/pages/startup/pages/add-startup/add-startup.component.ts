import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startup/startups.service';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css'],
})
export class AddStartupComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  imgSrc: any;
  listOfSectors: any[] = [];
  subscribe!: Subscription;
  formData: Startup = {
    city: '',
    emailAddress: '',
    logo: '',
    name: '',
    numberOfEmployees: null,
    sectors: [],
    websiteUrl: '',
    yearOfEstablishment: '',
  };

  constructor(
    private formBulider: FormBuilder,
    private _startupService: StartupsService,
    private _uploadService: UploadService,
    private _sectorService: SectorsService,
    private location: Location
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

  ngOnInit(): void {
    this.getAllSectors();
  }
  getAllSectors() {
    this.subscribe = this._sectorService.getAll().subscribe((result) => {
      if (result) {
        this.listOfSectors = result;
      }
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

  validaterFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  onAddStartupCliked() {
    if (this.formGroup.invalid) {
      this.validaterFormGroup();
    } else {
      if (this.formGroup.controls['logo'].value) {
        this.upload();
      } else {
        this.createStartup();
      }
    }
  }

  createStartup() {
    this._startupService
      .create({
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
      this.createStartup();
    });
  }
}
