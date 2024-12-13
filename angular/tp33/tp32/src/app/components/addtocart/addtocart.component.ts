import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddToCartComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }

  confirmPurchase(): void {
    const confirmPurchase = confirm('Are you sure you want to confirm the purchase?');
  
    if (confirmPurchase) {
      this.cartItems.forEach((cartProduct) => {
        this.productsService.updateProductQuantity(cartProduct.id, cartProduct.quantity || 1).subscribe({
          next: () => console.log(`Product ${cartProduct.id} updated successfully`),
          error: (err) => console.error(`Error updating product ${cartProduct.id}:`, err),
        });
      });
  
      // Vider le panier après la confirmation de l'achat
      this.cartService.clearCart(); // Utilisez la méthode corrigée du service
      this.cartItems = [];
      this.calculateTotalPrice();
  
      alert('Purchase confirmed successfully!');
    }
  }
  

  updateQuantity(product: any, change: number): void {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItems[index].quantity = Math.max(
        1,
        (this.cartItems[index].quantity || 1) + change
      );
      this.calculateTotalPrice();
    }
  }

  clearCart(): void {
    const confirmClear = confirm('Are you sure you want to clear the entire cart?');
    if (confirmClear) {
      this.cartItems = [];
      this.cartService.clearCart();
      this.calculateTotalPrice();
    }
  }
 
  
}
