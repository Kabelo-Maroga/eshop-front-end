import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/product';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: IProduct[] = [];

  filteredProducts: any[];

  category: string;

  cart: any;

  subscribtion: Subscription;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {

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
  }

  async ngOnInit() {
    this.subscribtion = (await this.shoppingCartService.getCart()).snapshotChanges()
      .subscribe(cart => {
        this.cart = cart.payload.val();
      });
  }

  ngOnDestroy(): void {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }

}
