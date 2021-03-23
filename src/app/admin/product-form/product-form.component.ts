import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Observable} from 'rxjs';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  categories: Observable<any[]>;

  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories = categoryService.getCategories();
  }

  save(product: any) {
    this.productService.create(product);
  }
}
