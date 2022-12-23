import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Startup } from 'src/app/core/interfaces/startups.interface';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css']
})
export class AddStartupComponent  implements OnInit{


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
formGroup:FormGroup;
  constructor(private formBulider:FormBuilder){
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
}
