import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() : Observable<any[]> {
    return this.db.list('/products').valueChanges();
  }

  getAllSnapshots() {
    return this.db.list('/products').snapshotChanges();
  }

  getProduct(id: string) {
    return this.db.object('/products/' + id).valueChanges();
  }

}
