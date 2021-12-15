import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from './cart.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  public cartItems: CartItem[] = [];
  public grandTotalPrice: number = 0;
  destroy = new Subject();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartDetails.pipe(takeUntil(this.destroy)).subscribe( data => {
      console.log(data)
      this.cartItems = data;
      this.grandTotalPrice = this.cartItems.reduce( (acc, value) => {
        return acc+ value.total;
      }, 0)
    })
  }

  removeItem(product: CartItem) {
    this.cartService.removeProductFromCart(product.productInfo.id);
  }

  emptyCart() {
    this.cartService.removeAllFromCart();
  }

  increment(product: CartItem) {
    this.cartService.increaseProductCount(product.productInfo.id);
  }

  decrement(product: CartItem) {
    this.cartService.decreaseProductCount(product.productInfo.id);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
