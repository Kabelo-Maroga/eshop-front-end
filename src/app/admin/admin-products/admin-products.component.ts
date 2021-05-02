import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: any[];

  filteredProducts: any[];

  subscribtion: Subscription;

  constructor(private productService: ProductService) {
    this.subscribtion = this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, value: c.payload.val() })
        )
      )
    ).subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter(p => p?.value?.title?.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }
}
