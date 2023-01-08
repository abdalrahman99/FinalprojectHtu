import { Component ,OnDestroy,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sectors } from 'src/app/core/interfaces/sector.interface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { Location } from '@angular/common';
import { UploadService } from 'src/app/core/services/upload.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create-sectors',
  templateUrl: './create-sectors.component.html',
  styleUrls: ['./create-sectors.component.css']
})
export class CreateSectorsComponent implements OnInit , OnDestroy{
  formGroup:FormGroup;
  imgSrc:any;
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
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    console.log('done unsubscribe');

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
   onAddSectorCliked(){
    if(this.formGroup.invalid){
      this.validaterFormGroup();
    }else{
      if(this.formGroup.controls['logo'].value){
        this.upload();
      }else{
        this.createSectors()
      }

    }
}
createSectors(){
  this._sectorsService.create({
    name:this.formGroup.controls['name'].value,
    logo:this.formGroup.controls['logo'].value,
    color:this.formGroup.controls['color'].value,
    sectors:this.formGroup.controls['sectors'].value,
    categoryName:this.formGroup.controls['categoryName'].value,
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
  this.subscribe = this._uploadService
    .upload
    (this.formGroup.controls['logo'].value)
    .subscribe((file)=>{
     if(file?.metadata){
      this.getDownloadURL();
     }
  });
};

getDownloadURL(){
 this.subscribe = this._uploadService.getDownloadURL().subscribe((url)=>{
  console.log();
  this.formGroup.controls['logo'].setValue(url);
  this.createSectors();
  });
}

}
