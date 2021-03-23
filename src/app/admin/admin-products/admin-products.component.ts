import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  products: Observable<any[]>;

  constructor(private productService: ProductService) {
    this.products = productService.getAll();
  }
}
