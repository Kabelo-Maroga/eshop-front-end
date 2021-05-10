import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: IProduct[] = [];

  filteredProducts: any[];

  categories: any[] = [];

  category: string;

  subscribtion: Subscription;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {
    this.subscribtion = this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, value: c.payload.val() })
        )
      )
    ).subscribe(products => {
      //TODO: use switch map here fam...
      this.products = products;

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.value.category === this.category) :
          this.products;
      })
    });

    this.subscribtion = this.categoryService.getCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, value: c.payload.val() })
        )
      )
    ).subscribe(categories => this.categories = categories);

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }

}
