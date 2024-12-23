import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  AvaliableSelectedProductAction,
  DeleteProductAction,
  SelectedProductAction,
  UpdateProductAction,
} from '../../../ngrx/storeproducts/actions/prodcuts.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent implements OnInit {
  // Product
  @Input() product: Product | null = null;

  constructor(private store: Store, private router: Router) {}
  ngOnInit(): void {}

  onSelectProduct(product: Product) {
    this.store.dispatch(new SelectedProductAction(product));
  }

  onAvaliableProduct(product: Product) {
    this.store.dispatch(new AvaliableSelectedProductAction(product));
  }

  onDeleteProduct(product: Product) {
    this.store.dispatch(new DeleteProductAction(product));
    // console.log('Deleting product:', product); // Vérifiez ici que product.id est défini
    // if (product && product.id) {
    //   this.store.dispatch(new DeleteProductAction(product));
    // } else {
    //   console.error('Product ID is undefined');
    // }
  }

  onUpdateProduct(product: Product) {
    // switch vers ig url to get prodct
    this.router.navigateByUrl('/editProduct/' + product.id);
  }
}
