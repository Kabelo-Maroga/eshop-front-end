import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  categories: Observable<any[]>;

  constructor(categoryService: CategoryService) {
    this.categories = categoryService.getCategories();
  }
}
