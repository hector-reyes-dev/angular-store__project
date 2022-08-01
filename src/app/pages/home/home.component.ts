import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
  }

  loadMore(): void {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
