import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {UserCredential} from '@firebase/auth-types';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

dbPath='/users';
dbRef:AngularFireList<any>;

userInf = new BehaviorSubject<any>({});
isLoggedin$ = new BehaviorSubject<boolean>(!!localStorage.getItem('userId'));
userId:string = '';

constructor(
    private angularFireAuth:AngularFireAuth,
    private angularFireDatabase:AngularFireDatabase,
    private router:Router,
    ) {
    this.dbRef=angularFireDatabase.list(this.dbPath);
    this.authStateSubscripe();
  }

  get isLoggedIn(){
    return this.isLoggedin$.getValue();
  }

  login(email:string,password:string):Observable<any>{
  return from (
    this.angularFireAuth.signInWithEmailAndPassword(email,password)
    .catch((error)=>{
      window.alert(error.message);
    })
    );
  }

  signup(email:string,password:string) : Observable <UserCredential>{
  return from(
    this.angularFireAuth.createUserWithEmailAndPassword(email,password))
  }


  createUser(userId:string,name:string,email:string):Observable <any>{
   this.userId=userId;
    return from
    (this.dbRef.update(userId,{
      userId:userId,
      name:name,
      email:email,
      role:'enduser', //end-user

    }));
  }
// logged or not logged
 authStateSubscripe(){
  this.angularFireAuth.authState.subscribe((user)=>{
    if(user){
      if(!this.isLoggedIn){
        this.router.navigate(['/startup/all-startup'])
      }
      this.getUserById(user.uid);
      localStorage.setItem('userId',user.uid);
       this.isLoggedin$.next(true);
    }else{
      localStorage.removeItem('userId');
      this.isLoggedin$.next(false);
    }

  })
 }

  logout(){
    this.angularFireAuth.signOut().then(()=>{
      localStorage.removeItem('userId');
      this.router.navigate(['/home']);
      this.isLoggedin$.next(false);
    })
  }

  getUserById(userId:string) {
   this.angularFireDatabase
    .object(`${this.dbPath}/${userId}`)
    .valueChanges().subscribe((user)=>{
      this.userInf.next(user);
    })

  }
}
