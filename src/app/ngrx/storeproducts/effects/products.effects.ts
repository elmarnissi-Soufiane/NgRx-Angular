// Effects c'est un class est services

import { Injectable } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  GetAllProductsActionError,
  GetAllProductsActionSuccess,
  GetAvailableProductsActionError,
  GetAvailableProductsActionSuccess,
  GetSelectedProductsActionError,
  GetSelectedProductsActionSuccess,
  ProductActionsTypes,
} from '../actions/prodcuts.actions';

@Injectable()
export class ProductsEffectts {
  // utiliser notre service
  constructor(
    private productsService: ProductsService,
    private effectActions: Actions
  ) {}

  // pour chaque action on creer une focntion qui permet de traite
  // Define the effect
  getAllProductsEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      // Listen for the GET_ALL_PRODUCTS action
      ofType(ProductActionsTypes.GET_ALL_PRODUCTS),
      mergeMap(() =>
        // Call the service to get all products
        this.productsService.getAllProducts().pipe(
          // On success, dispatch the success action
          map((data) => new GetAllProductsActionSuccess(data)),
          // On error, dispatch the error action
          catchError((error) =>
            of(new GetAllProductsActionError(error.message))
          )
        )
      )
    )
  );

  // Get selected Product
  getSelectedProductsEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap(() =>
        this.productsService.getSelectedProducts().pipe(
          map((data) => new GetSelectedProductsActionSuccess(data)),
          catchError((error) =>
            of(new GetSelectedProductsActionError(error.message))
          )
        )
      )
    )
  );

  // Get Avaliable Product
  getAvaliableProductsEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.GET_AVALIABLE_PRODUCTS),
      mergeMap(() =>
        this.productsService.getAvailableProducts().pipe(
          map((data) => new GetAvailableProductsActionSuccess(data)),
          catchError((error) =>
            of(new GetAvailableProductsActionError(error.message))
          )
        )
      )
    )
  );
}
