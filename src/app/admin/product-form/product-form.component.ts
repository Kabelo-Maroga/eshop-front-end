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

  productSnapshots: Observable<any[]>;

  product;

  items = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) {
    this.categories = categoryService.getCategories();
    this.productSnapshots = productService.getAllSnapshots();

    this.productSnapshots.subscribe(snapshot => {
      for (let i = 0; i < snapshot.length; i++) {
        this.items.push({
          key: snapshot[i].key
        })
      }
      // console.log(this.items[0].key);
    })

    let id = this.route.snapshot.paramMap.get('id');
    if(this.items != null) {
      console.log(this.items[0]?.key);

    }

    // if (id && this.items[0])
      // productService.getProduct(this.items[0].key).subscribe(p => this.product = p);
    // console.log(id);
  }

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  // ngOnInit(): void {
  //   this.productSnapshots.subscribe(snapshot => {
  //     for (let i = 0; i < snapshot.length; i++) {
  //       this.items.push({
  //         key: snapshot[i].key
  //       })
  //     }
  //     console.log(this.items);
  //   })
  // }
}
