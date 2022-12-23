import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Startup } from '../interfaces/startups.interface';

@Injectable({
  providedIn: 'root'
})
export class StartupsService {
dbpath='/startups';
dbRef: AngularFireList<Startup>;


  constructor(private angularFiredatabase:AngularFireDatabase) {
    this.dbRef= angularFiredatabase.list(this.dbpath)
  }

  create(data:Startup){
  return this.dbRef.push(data);
  }
  update(key:string,data:Startup){
   return this.dbRef.update(key,data);
  }
  delete(key:string){
  return this.dbRef.remove(key);
  }

  deleteall(){
    return this.dbRef.remove();
    }

    getById(key:string){
       return this.angularFiredatabase
       .object(`${this.dbpath}/${key}`).valueChanges();
    }

    getAll(){
    return  this.dbRef.snapshotChanges().pipe(
        map((data)=>{
          data.map((obj)=>({key:obj.payload.key,...obj.payload.val()}))
        })
      )
    }
}
