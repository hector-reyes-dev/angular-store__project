import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Event,
  NavigationStart,
} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-category',
  template: `<app-products
    [categoryId]="categoryId"
    [products]="products"
    (loadMore)="loadMore()"
  ></app-products>`,
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  categoryId: string | null = null;
  limit = 10;
  offset = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');

          if (this.categoryId) {
            return this.productsService.getbyCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }

          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
        this.offset += this.limit;
      });

    this.resetLimitAndOffset();
  }

  resetLimitAndOffset(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.limit = 10;
        this.offset = 0;
      }
    });
  }

  loadMore(): void {
    if (this.categoryId) {
      this.productsService
        .getbyCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data) => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
    }
  }
}
