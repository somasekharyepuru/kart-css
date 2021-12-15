import { IProduct } from 'src/app/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productsCols: string[] = ['sno', 'image', 'name', 'price', 'actions'];
  products: IProduct[] = [
    {name: "Product1", image: '', price: 1, description: 'ajdfl', available: true, id: 1}
  ];
  subscriptions: Subscription[] = [];

  constructor(
    private productsSrv: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productsSrv.loadProducts();

    const productsRef = this.productsSrv.products$.subscribe((res: IProduct[]) => {
      console.log("res:: ", res);
      this.products = res;
    });

    this.subscriptions = this.subscriptions.concat([productsRef]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addProduct() {
    console.log("add product");
    this.router.navigate(['', 'products', 'add']);
  }

  updateProduct(product: IProduct) {
    console.log("Update product::",product);
    this.router.navigate(['', 'products', 'edit', product.id]);
  }

  deleteProduct(id: number) {
    this.productsSrv.deleteProductById(id).subscribe(res => {
      if(res) {
        // TODO: Show success message.
      }else {
        // TODO: show error message.
      }
    });
  }
}
