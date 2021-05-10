import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: IProduct[] = [];

  subscribtion: Subscription;

  constructor(private productService: ProductService) {
    this.subscribtion = this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, value: c.payload.val() })
        )
      )
    ).subscribe(products => {
      console.log(products);
      this.products = products
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }

}
