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
  dbpath = '/requestStartup';
  dbRef: AngularFireList<Startup>;
  constructor(private angularFiredatabase: AngularFireDatabase) {
    this.dbRef = angularFiredatabase.list(this.dbpath);
  }

  create(data: Startup) {
    return this.dbRef.push(data);
  }

  delete(key: string | undefined) {
    return this.dbRef.remove(key);
  }

  getAll(): Observable<any> {
    return this.dbRef
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((obj) => ({ key: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }

}
