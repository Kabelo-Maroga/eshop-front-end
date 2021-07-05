import { IProduct } from "./product";

export interface ShoppingCartItem {
    product: IProduct;
    quantity: number;
}