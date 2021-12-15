import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models';
import { ProductsService } from '../../products.service';
import { CartService } from 'src/app/modules/cart/cart.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  products: IProduct[] = [];
  subscriptions: Subscription[] = [];

  constructor(public productSrv: ProductsService, private cartService: CartService) { }

  ngOnInit() {
    this.productSrv.loadProducts();

    this.productSrv.products$.subscribe(res => {
      this.products = res;
    })
  }

  addToCart(product) {
    this.cartService.addToCart(product)
  }

}
