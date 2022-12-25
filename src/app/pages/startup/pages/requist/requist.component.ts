import { Location } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups.service';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-requist',
  templateUrl: './requist.component.html',
  styleUrls: ['./requist.component.css']
})
export class RequistComponent implements OnInit{
  formGroup:FormGroup;
  imgSrc:any;

  formData:Startup={
    city:'',
    emailAddress:'',
    logo:'',
    name:'',
    numberOfEmployees:null,
    sectors:[],
    websiteUrl:'',
    yearOfEstablishment:'',
   };

  constructor(
    private formBulider:FormBuilder,
    private _startupService:StartupsService,
    private _uploadService:UploadService,
    private location:Location,
    ){
    this.formGroup=this.formBulider.group({
      city:null,
      emailAddress:[null,[Validators.email,Validators.required]],
      logo:null,
      name:[null,[Validators.required]],
      numberOfEmployees:null,
      sectors:[null,[Validators.required]],
      websiteUrl:[null,[Validators.required]],
      yearOfEstablishment:null,
    })
  }

  ngOnInit(): void {}

   getErrorMessage(control:any){
    if(control && control.errors){


     if(control.hasError('required')){
        return  'You must enter a value '
     }
     if(control.hasError('email')){
      return  'Not a valid email '
   } }
   return '';
   }

   validaterFormGroup(){
    Object.keys(this.formGroup.controls).forEach((filed)=>{
      const control = this.formGroup.get(filed);
      control?.markAsTouched({onlySelf:true});
    })
   }




   onAddCliked(){
    if(this.formGroup.invalid){
      this.validaterFormGroup();
    }else{
      if(this.formGroup.controls['logo'].value){
        this.upload();
      }else{
        this.createStartup();
      }

    }
   }


   createStartup(){
this._startupService
.createRequest({
  name:this.formGroup.controls['name'].value,
  emailAddress:this.formGroup.controls['emailAddress'].value,
  websiteUrl:this.formGroup.controls['websiteUrl'].value,
  sectors:this.formGroup.controls['sectors'].value,
  city:this.formGroup.controls['city'].value,
  numberOfEmployees:this.formGroup.controls['numberOfEmployees'].value,
  logo:this.formGroup.controls['logo'].value,
  yearOfEstablishment:this.formGroup.controls['yearOfEstablishment'].value,

   }).then(()=>{
    this.location.back();
   })
}


   onFileInputChange($event:any){
    console.log($event);

     this.formGroup.controls['logo'].setValue($event.target.files[0]);

     //file data Url storge
     const reader = new FileReader();
     reader.readAsDataURL(this.formGroup.controls['logo'].value);
     reader.onload = e =>(this.imgSrc = reader.result);

    }



   upload(){
    this._uploadService
    .upload
    (this.formGroup.controls['logo'].value)
    .subscribe((file)=>{
     if(file?.metadata){
      this.getDownloadURL();

     }
  });
};

getDownloadURL(){

  this._uploadService.getDownloadURL().subscribe((url)=>{
    console.log();
  this.formGroup.controls['logo'].setValue(url);
  this.createStartup();
  });

}


}
