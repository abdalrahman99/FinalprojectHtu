import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Startup } from '../../interfaces/startups.interface';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  dbpath = '/approval';
  dbRef: AngularFireList<Startup>;
  constructor(private angularFiredatabase: AngularFireDatabase) {
    this.dbRef = angularFiredatabase.list(this.dbpath);
  }
  create(data: Startup) {
    return this.dbRef.push(data);
  }

  createRequest(data: Startup) {
    return this.dbRef.push(data);
  }

  update(key: string, data: Startup) {
    return this.dbRef.update(key, data);
  }
  delete(key: string | undefined) {
    return this.dbRef.remove(key);
  }

  deleteall() {
    return this.dbRef.remove();
  }
  getById(key: string) {
    return this.angularFiredatabase
      .object(`${this.dbpath}/${key}`)
      .valueChanges();
  }

  getAll(): Observable<any> {
    return this.angularFiredatabase.list<Startup>('/requestStartup')
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((obj) => ({ key: obj.payload.key , ...obj.payload.val()}))
        )
      );
  }

  deleteRequested(key: string | undefined) {
    return this.angularFiredatabase.list('/requestStartup').remove(key);
  }
}
