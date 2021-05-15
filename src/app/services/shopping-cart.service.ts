import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IProduct } from '../models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  data: any;

  item: any;

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cardId = localStorage.getItem('cardId');
    if (cardId) return cardId;

    let res = await this.create();
    localStorage.setItem('cardId', res.key);
    return res.key;
  }

  async addToCart(product: IProduct) {
    this.updateItemQuantity(product, 1);
  } 

  async removeFromCart(product: IProduct) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: IProduct, change: number) {
    //need to refactor this here...
    let cartId = await this.getOrCreateCartId();
    let item$$ = this.getItem(cartId, product.key);
    let item$ = this.getItem(cartId, product.key).snapshotChanges();
    item$.pipe(take(1)).subscribe(item => {
      this.data = item.payload.val();

      if (this.data != null) {
        item$$.update({ product: product, quantity: (this.data.quantity) + change });
      } else {
        item$$.set({ product: product, quantity: 1 });
      }
    });
  }
}