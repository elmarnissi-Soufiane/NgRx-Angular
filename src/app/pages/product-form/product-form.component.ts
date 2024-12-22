import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  // pour les validators
  prodcutFormGroup = this._formGroup.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
    selected: [true, Validators.required],
    available: [true, Validators.required],
  });

  // pour verfies le fields
  submitted: boolean = false;

  constructor(
    private _formGroup: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  // ajouter
  onSaveProduct() {
    this.submitted = true;
    if (this.prodcutFormGroup.invalid) return;
    let save = this.productsService.saveProduct(
      this.prodcutFormGroup.value as Product
    );
    save.subscribe({
      next: (savedProduct) => {
        console.log('Produit sauvegardé avec succès :', savedProduct);
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde du produit :', err);
      },
    });
  }
}
