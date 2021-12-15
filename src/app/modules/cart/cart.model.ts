import { IProduct } from 'src/app/models';

export interface CartItem {
  productInfo: IProduct
  quantity: number;
  total: number;
}
