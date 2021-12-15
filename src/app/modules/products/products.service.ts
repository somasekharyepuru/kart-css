import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject, Observable } from 'rxjs';
import { IProduct } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: IProduct[] = [];
  products$ = new BehaviorSubject<IProduct[]>(this.products);
  productsLoaded: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  loadProducts(): void {
    if(this.productsLoaded) {
      this.setProducts(this.products);
      return;
    };

    // TODO: Fetch products info from api
    const products = [1,2,3,4,5,6,7,8,9].map(s => (
      {id: s, 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI4LFv9vTJ4bPvHrLVDV5wUSFtbWFTrrmorQ&usqp=CAU', 
        name: `Product ${s}`, price: Math.random() * 10000,
        description: 'this is product description', available: true}
    ));

    // update products
    this.setProducts(products);
    this.productsLoaded = true;
  }

  addProduct(product: IProduct) {
    // TODO: Integrate add product api.
    this.setProducts(this.products.concat([product]));

    return of(true);
  }

  deleteProductById(id: number) {
    // TODO: integrate api
    const products = this.products.filter(p => p.id !== id);

    if(this.products.length === products.length) {
      console.log('No product found with id');
      return of(false);
    }else {
      this.setProducts(products);
      return of(true);
    }
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.products$.next(this.products);
  }

  getProducts(): IProduct[] {
    return this.products;
  }



  getProductInfoById(id: number): Observable<IProduct> {
    this.loadProducts();

    const productIndex = this.products.findIndex(p => p.id === id);
    return of(productIndex > -1 ? this.products[productIndex] : null);
  }

}
