import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll(): AngularFireList<Product>{
    return this.db.list('/products');
  }

  get(id) {
    return this.db.object('/products/' + id).valueChanges();
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id) {
    return this.db.object('/products/' + id).remove();
  }

}
