import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId!: number;
  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Récupération de l'ID du produit depuis l'URL
    this.productId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    // Charger les données du produit via le service et préremplir le formulaire
    this.productsService.getProduct(this.productId).subscribe(product => {
      this.productFormGroup = this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        selected: [product.selected, Validators.required],
        available: [product.available, Validators.required],
        imageUrl: [product.imageUrl, Validators.required], // Image URL ajouté
        category: [product.category, Validators.required] // Catégorie ajoutée
      });
    });
  }

  // Méthode pour mettre à jour un produit
  onUpdateProduct() {
    this.submitted = true;

    // Vérifier si le formulaire est valide
    if (this.productFormGroup?.invalid) return;

    // Appeler le service pour mettre à jour le produit
    this.productsService.updateProduct(this.productId, this.productFormGroup?.value).subscribe(data => {
      alert('Product successfully updated');
     this.router.navigateByUrl('/products');
    });
  }


  onCancel(): void {
    this.router.navigateByUrl('/products');
  }
  
}
