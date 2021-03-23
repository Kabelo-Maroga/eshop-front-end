import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Observable} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  categories: Observable<any[]>;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router) {
    this.categories = categoryService.getCategories();
  }

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
