import { IProduct } from 'src/app/models';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/modules/cart/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product: IProduct;
  @Output() cartAdd = new EventEmitter<IProduct>();
  isProductExists = false;
  destroy = new Subject();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.cartDetails.pipe(takeUntil(this.destroy)).subscribe( data => {
      const productData = this.cartService.getProductById(this.product.id);
      if (!!productData) {
        this.isProductExists = true;
      } else {
        this.isProductExists = false;
      }
    })
  }

  addToCart() {
    this.cartAdd.emit(this.product);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
