import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sectors } from 'src/app/core/interfaces/sector.interface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-sectors',
  templateUrl: './edit-sectors.component.html',
  styleUrls: ['./edit-sectors.component.css']
})
export class EditSectorsComponent implements OnInit , OnDestroy{
  formGroup:FormGroup;
  imgSrc:any;
  key:string='';
  subscribe!:Subscription;
  formData:Sectors={
    name:'',
    logo:'',
    color:'',
    sectors:'',
    categoryName:'',
  }
  constructor(
    private  formBulider:FormBuilder,
    private _sectorsService:SectorsService,
    private _uploadService:UploadService,
    private  location:Location,
    private activatedRoute:ActivatedRoute,
     ){
      this.formGroup = this.formBulider.group({
        name:[null,[Validators.required]],
        logo:null,
        color:[null,[Validators.required]],
        sectors:[null,[Validators.required]],
        categoryName:[null,[Validators.required]],
      })
     }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    console.log("done unsubscribe");
  }

  ngOnInit(): void {
  this.subscribe = this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['key']) {
        this.key=result['key'];
         this.getById();
      }

  })
  }
  getById(){
  this.subscribe = this._sectorsService.getById(this.key).subscribe((result:any)=>{
      this.formGroup=this.formBulider.group({
        logo: result['logo'],
        name:[result['name'],[Validators.required]],
        sectors:[result['sectors'],[Validators.required]],
        color: [result['color'],[Validators.required]],
        categoryName:[result['categoryName'],[Validators.required]],
    })
    this.imgSrc = result['logo'];
  })
  }


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
    updateSectorCliked(){
    if(this.formGroup.invalid){
      this.validaterFormGroup();
    }else{
      if(this.formGroup.controls['logo'].value){
        this.upload();
      }else{
        this.updateSectors()
      }

    }
}
updateSectors(){
  this._sectorsService.update(this.key,{
    name:this.formGroup.controls['name'].value,
    logo:this.formGroup.controls['logo'].value,
    color:this.formGroup.controls['color'].value,
    sectors:this.formGroup.controls['sectors'].value,
    categoryName:this.formGroup.controls['categoryName'].value,
}).then(()=>{
   this.location.back();
})
 }

 getDownloadURL(){
 this.subscribe = this._uploadService.getDownloadURL().subscribe((url)=>{
  console.log();
  this.formGroup.controls['logo'].setValue(url);
  this.updateSectors();
  });
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

  onFileInputChange($event:any){
    console.log($event);
     this.formGroup.controls['logo'].setValue($event.target.files[0]);
     //file data Url storge
     const reader = new FileReader();
     reader.readAsDataURL(this.formGroup.controls['logo'].value);
     reader.onload = e =>(this.imgSrc = reader.result);
    }

}
