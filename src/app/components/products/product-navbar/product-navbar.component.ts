import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  GetAllProductsAction,
  GetAvailableProductsAction,
  GetSelectedProductsAction,
  NewProductAction,
  SerearchProductAction,
} from '../../../ngrx/storeproducts/actions/prodcuts.actions';
import { Router } from '@angular/router';
import { ProductActionsTypes } from '../../../ngrx/storeproducts/actions/prodcuts.actions';
import {
  ProductsState,
  ProductStateEnum,
} from '../../../ngrx/storeproducts/reducers/products.reducers';

@Component({
  selector: 'app-product-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-navbar.component.html',
  styleUrl: './product-navbar.component.css',
})
export class ProductNavbarComponent implements OnInit {
  // pour faire une action sur les evenet diff
  state: ProductsState | null = null;
  readonly ProductActionsTypes = ProductActionsTypes;

  constructor(private store: Store<any>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.state = state.catalogueState;
    });
  }

  onGetAllProducts() {
    //damande de l'action
    this.store.dispatch(new GetAllProductsAction({}));
  }

  onGetSelectedProduct() {
    this.store.dispatch(new GetSelectedProductsAction({}));
  }

  onGetAvaiableProduct() {
    this.store.dispatch(new GetAvailableProductsAction({}));
  }

  onNewProduct() {
    this.router.navigateByUrl('/newProduct');
  }

  onSerach(dataForm: any) {
    this.store.dispatch(new SerearchProductAction(dataForm.keyword));
  }
}
