import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { ReversePipe } from './pipes/reverse/reverse.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    TimeAgoPipe,
    ReversePipe,
    HighlightDirective,
  ],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    TimeAgoPipe,
    ReversePipe,
    HighlightDirective,
  ],
})
export class SharedModule {}
