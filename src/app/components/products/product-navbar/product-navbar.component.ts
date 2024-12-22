import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from '../../../state/product.state';

@Component({
  selector: 'app-product-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-navbar.component.html',
  styleUrl: './product-navbar.component.css',
})
export class ProductNavbarComponent implements OnInit {
  // pour faire intercation avec parent et children decourateur output ç une sortie Maitre
  /// en utilisant interface poour avoir type de l'evenements
  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onGetAllProducts() {
    // faire un evenement
    this.productEventEmitter.emit({
      type: ProductActionsTypes.GET_ALL_PRODUCTS,
    });
  }

  onGetSelectedProduct() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.GET_SELECTED_PRODUCTS,
    });
  }

  onGetAvaiableProduct() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.GET_AVALIABLE_PRODUCTS,
    });
  }

  onNewProduct() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.NEW_PRODUCT,
    });
  }

  onSerach(keyword: any) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.SEARCH_PRODUCTS,
      payload: keyword,
    });
  }
}
