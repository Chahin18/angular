import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);

  // Observable pour écouter les changements du compteur du panier
  cartCount$ = this.cartCountSubject.asObservable();

  // Ajouter un produit au panier
  addToCart(product: Product): void {
    const existingProduct = this.cart.find((p) => p.id === product.id);
    if (!existingProduct) {
      this.cart.push({ ...product });
    } else {
      existingProduct.quantity! += 1;
    }
    this.cartCountSubject.next(this.cart.length); // Mise à jour du compteur
  }

  // Récupérer les produits du panier
  getCartItems(): Product[] {
    return this.cart;
  }

  // Récupérer le nombre d'articles dans le panier
  getCartCount(): number {
    return this.cart.length;
  }

  // Supprimer un produit du panier
  removeFromCart(product: Product): void {
    const index = this.cart.indexOf(product);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
    this.cartCountSubject.next(this.cart.length); // Mise à jour du compteur
  }

  // Vider tout le panier
  clearCart(): void {
    this.cart = []; // Réinitialiser le panier
    this.cartCountSubject.next(0); // Mettre à jour le compteur à 0
  }
}
