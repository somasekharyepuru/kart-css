import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/models';
import { CartItem } from './cart.model';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productList: CartItem[] = [];
  public cartDetails = new BehaviorSubject([]);
  constructor(
    private storageService: StorageService
  ) {
    const productsAvailable = this.storageService.get('cartInfo');
    if (productsAvailable) {
      this.productList = productsAvailable;
      this.updateCart();
    }
  }

  getProductList() {
    return this.productList;
  }

  addToCart(product: IProduct, quantity: number = 1): void {
    if (this.getProductById(product.id)) {
      this.increaseProductCount(product.id)
    } else {
      this.productList.push({
        productInfo: product,
        quantity: quantity,
        total: quantity * product.price
      });
    };
    this.updateCart();
  }

  increaseProductCount(productId: number) {
    console.log(productId, this.productList)
    const product = this.getProductById(productId);
    product.quantity++;
    this.calculateProductPrice(product);
    this.updateCart();
  }

  private calculateProductPrice(cartItem: CartItem) {
    cartItem.total =  cartItem.productInfo.price * cartItem.quantity;
  }

  decreaseProductCount(productId: number) {
    const product = this.getProductById(productId);
    product.quantity--;
    this.calculateProductPrice(product);
    this.updateCart();
  }

  getProductById(productId: number): CartItem | null {
    const [productIfExists] = this.productList.filter(currentProduct => currentProduct.productInfo.id === productId);
    return productIfExists ? productIfExists: null;
  }

  removeAllFromCart() {
    this.productList = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartDetails.next(this.productList);
    this.storageService.add('cartInfo', this.productList);
  }

  public removeProductFromCart(productId: number) {
    const productIndex = this.productList.findIndex( product => product.productInfo.id === productId);
    if (productIndex != -1) {
      this.productList.splice(productIndex, 1);
    }
    this.updateCart();
  }
}
