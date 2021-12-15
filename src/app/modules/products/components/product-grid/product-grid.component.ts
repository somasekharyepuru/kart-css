import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  products: IProduct[] = [];
  subscriptions: Subscription[] = [];

  constructor(public productSrv: ProductsService) { }

  ngOnInit() {
    this.productSrv.loadProducts();

    this.productSrv.products$.subscribe(res => {
      this.products = res;
    })
  }

}
