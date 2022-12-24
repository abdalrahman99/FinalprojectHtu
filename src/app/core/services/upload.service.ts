import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, GetDownloadURLPipe } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

   dbpath='/files';
  storgeRef:AngularFireStorageReference;
  filueUrl:string='';
  constructor(private storage:AngularFireStorage) {
      this.storgeRef=storage.ref('');
   }

   upload(file:File) {
    const  filePath = `${this.dbpath}/${file.name}${new Date()}`;
    this.storgeRef = this.storage.ref(filePath);
    return  this.storage.upload(filePath,file) .snapshotChanges()
   }

   getDownloadURL(){
     return this.storgeRef.getDownloadURL();
   }

}

