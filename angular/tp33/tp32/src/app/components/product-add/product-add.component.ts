import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup?: FormGroup;
  submitted: boolean = false;
  categories: string[] = []; // Liste des catégories dynamiques

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire avec les champs nécessaires
    this.productFormGroup = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      discount: [0], // Champ pour la réduction
      imageUrl: ["", Validators.required], // Champ pour l'URL de l'image
      selected: [false],
      available: [true],
      category: ["", Validators.required], // Champ pour la catégorie
    });

    // Charger les catégories disponibles
    this.loadCategories();
  }

  // Charger dynamiquement les catégories
  loadCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      },
    });
  }

  onSaveProduct() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;

    this.productsService.save(this.productFormGroup?.value).subscribe({
      next: (data) => {
        alert('Product successfully added!');
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        console.error('Failed to save product:', err);
      },
    });
  }

  onCancel(): void {
    this.router.navigateByUrl('/products'); // Navigate to the products list
  }
  
}
