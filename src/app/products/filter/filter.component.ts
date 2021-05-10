import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  categories: any[] = [];

  subscribtion: Subscription;

  @Input("category") category;

  constructor(private categoryService: CategoryService) {
    this.subscribtion = this.categoryService.getCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, value: c.payload.val() })
        )
      )
    ).subscribe(categories => this.categories = categories);
   }

}
