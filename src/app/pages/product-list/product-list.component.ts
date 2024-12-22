import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionsTypes,
} from '../../state/product.state';
import { Product } from '../../models/product';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  readonly DataStateEnum = DataStateEnum;

  // Input envoey data from childrenn to parent Product pour affihcre sur fields utiliser sur widgets
  @Input() productsInputs$: Observable<AppDataState<Product[]>> | null = null;
  // get ouptut data from parent to childdren
  @Output() productsListEventEmitter: EventEmitter<ActionEvent> =
    new EventEmitter<ActionEvent>();

  constructor() {}

  ngOnInit(): void {}

  onSelectProduct(product: Product) {
    this.productsListEventEmitter.emit({
      type: ProductActionsTypes.SELECTED_PRODUCT,
      payload: product,
    });
  }

  onAvaliableProduct(product: Product) {
    this.productsListEventEmitter.emit({
      type: ProductActionsTypes.AVAILIABLE_PRODUCT,
      payload: product,
    });
  }

  onDeleteProduct(product: Product) {
    this.productsListEventEmitter.emit({
      type: ProductActionsTypes.DELETE_PRODUCT,
      payload: product,
    });
  }

  onUpdateProduct(product: Product) {
    this.productsListEventEmitter.emit({
      type: ProductActionsTypes.UPDATE_PRODUCT,
      payload: product,
    });
  }

  // get Output Event for item-productcheck product
  onActionEvent($event: ActionEvent): void {
    this.productsListEventEmitter.emit($event);
  }
}
