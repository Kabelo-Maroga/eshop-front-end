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

  constructor(private shoppingCartService : ShoppingCartService) { }

  addToCart(product: IProduct) {
    // console.log(product);
    this.shoppingCartService.addToCart(product);
  }

}
