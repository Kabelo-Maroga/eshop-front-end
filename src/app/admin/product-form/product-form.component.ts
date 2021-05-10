import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  categories: Observable<any[]>;

  product: any;

  id;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) {
    this.categories = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    productService.get(this.id).subscribe(p => this.product = p);
  }

  save(product: any) {
    if (this.id) {
      this.productService.update(this.id, product);
    }
    else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
