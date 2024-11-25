import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  addProductToCart(product: any) {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index === -1) {
      this.cart.push({ ...product, quantity: 1 });
    } else {
      this.cart[index].quantity++;
    }
  }

  removeProductFromCart(productId: any) {
    this.cart = this.cart.filter(item => item.id !== productId);
  }

  getCartItems() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }
}
