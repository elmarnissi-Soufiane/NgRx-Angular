import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  NewProductAction,
  SaveProductAction,
} from '../../ngrx/storeproducts/actions/prodcuts.actions';
import { Product } from '../../models/product';
import {
  ProductsState,
  ProductStateEnum,
} from '../../ngrx/storeproducts/reducers/products.reducers';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  // pour les validators
  productFormGroup: FormGroup | null = null;

  // pour verfies le fields
  submitted: boolean = false;
  state: ProductsState | null = null;
  readonly ProductStateEnum = ProductStateEnum;

  constructor(private _formGroup: FormBuilder, private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(new NewProductAction({}));
    this.store.subscribe((state) => {
      this.state = state.catalogueState;

      if (this.state?.dataState == ProductStateEnum.NEW) {
        this.productFormGroup = this._formGroup.group({
          name: ['', Validators.required],
          price: [0, Validators.required],
          quantity: [0, Validators.required],
          selected: [true, Validators.required],
          available: [true, Validators.required],
        });
      }
    });
  }

  newProduct() {
    this.store.dispatch(new NewProductAction({}));
  }

  // ajouter
  onSaveProduct() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;
    this.store.dispatch(new SaveProductAction(this.productFormGroup?.value));
  }
}
