import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { ActionEvent, ProductActionsTypes } from '../../../state/product.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent implements OnInit {
  // prendre depuis prodcut Item children to Paren Product List
  @Input() product: Product | null = null;

  @Output() eventEmitterItemProductList: EventEmitter<ActionEvent> =
    new EventEmitter<ActionEvent>();

  constructor() {}
  ngOnInit(): void {}

  onSelectProduct(product: Product) {
    this.eventEmitterItemProductList.emit({
      type: ProductActionsTypes.SELECTED_PRODUCT,
      payload: product,
    });
  }

  onAvaliableProduct(product: Product) {
    this.eventEmitterItemProductList.emit({
      type: ProductActionsTypes.AVAILIABLE_PRODUCT,
      payload: product,
    });
  }

  onDeleteProduct(product: Product) {
    this.eventEmitterItemProductList.emit({
      type: ProductActionsTypes.DELETE_PRODUCT,
      payload: product,
    });
  }

  onUpdateProduct(product: Product) {
    this.eventEmitterItemProductList.emit({
      type: ProductActionsTypes.UPDATE_PRODUCT,
      payload: product,
    });
  }
}
