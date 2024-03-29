import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input("product") product;
  @Input("shopping-cart") shoppingCart;

  constructor(private shoppingCartService : ShoppingCartService) { }

  addToCart() { 
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;

    let item = this.shoppingCart?.items[this.product?.key];
    return item ? item?.quantity : 0;
  }
}