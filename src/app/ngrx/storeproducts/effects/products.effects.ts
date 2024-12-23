// Effects c'est un class est services

import { Injectable } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';

import {
  EditProductActionError,
  EditProductActionSuccess,
  SerearchProductActionSuccess,
} from '../actions/prodcuts.actions';
import {
  AvaliableSelectedProductActionError,
  AvaliableSelectedProductActionSuccess,
  DeleteProductActionError,
  DeleteProductActionSuccess,
  GetAllProductsActionError,
  GetAllProductsActionSuccess,
  GetAvailableProductsActionError,
  GetAvailableProductsActionSuccess,
  GetSelectedProductsActionError,
  GetSelectedProductsActionSuccess,
  NewProductActionError,
  NewProductActionSuccess,
  ProductActionsTypes,
  ProductsActions,
  SaveProductActionError,
  SaveProductActionSuccess,
  SelectedProductActionError,
  SelectedProductActionSuccess,
  SerearchProductActionError,
  UpdateProductActionError,
  UpdateProductActionSuccess,
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
  getAllProductsEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      // Listen for the GET_ALL_PRODUCTS action
      ofType(ProductActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action: ProductsActions) =>
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
  getSelectedProductsEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action: ProductsActions) =>
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
  getAvaliableProductsEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.GET_AVALIABLE_PRODUCTS),
      mergeMap((action: ProductsActions) =>
        this.productsService.getAvailableProducts().pipe(
          map((data) => new GetAvailableProductsActionSuccess(data)),
          catchError((error) =>
            of(new GetAvailableProductsActionError(error.message))
          )
        )
      )
    )
  );
  // Serach
  searchProductEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.SEARCH_PRODUCTS),
      mergeMap((action: ProductsActions) =>
        this.productsService.searchProduts(action.payload).pipe(
          map((data) => new SerearchProductActionSuccess(data)),
          catchError((error) =>
            of(new SerearchProductActionError(error.message))
          )
        )
      )
    )
  );

  selectedProductEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.SELECTED_PRODUCT),
      mergeMap((action: ProductsActions) =>
        this.productsService.onSelectProduct(action.payload).pipe(
          map((data) => new SelectedProductActionSuccess(data)),
          catchError((error) =>
            of(new SelectedProductActionError(error.message))
          )
        )
      )
    )
  );

  // Avaliabe Product
  avaliableProductEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.AVAILIABLE_PRODUCT), // Action interceptée.
      mergeMap((action: ProductsActions) =>
        this.productsService.onAvailableProduct(action.payload).pipe(
          map((data) => new AvaliableSelectedProductActionSuccess(data)), // Succès.
          catchError(
            (error) =>
              of(new AvaliableSelectedProductActionError(error.message)) // Échec.
          )
        )
      )
    )
  );

  // New Product
  newProductEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.NEW_PRODUCT),
      map((action: ProductsActions) => {
        return new NewProductActionSuccess({});
      })
    )
  );

  // save product
  saveProductsEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.SAVE_PRODUCT),
      mergeMap((action: ProductsActions) =>
        this.productsService.saveProduct(action.payload).pipe(
          map((product) => new SaveProductActionSuccess(product)),
          catchError((error) => of(new SaveProductActionError(error.message)))
        )
      )
    )
  );

  // Edit Product
  editProductEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.EDIT_PRODUCT),
      mergeMap((action: ProductsActions) => {
        return this.productsService.getProductById(action.payload).pipe(
          map((data) => {
            return new EditProductActionSuccess(data);
          }),
          catchError((error) => of(new EditProductActionError(error.message)))
        );
      })
    )
  );

  //Update product
  updateProductEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.UPDATE_PRODUCT),
      mergeMap((action: ProductsActions) =>
        this.productsService.updateProduct(action.payload).pipe(
          map((data) => new UpdateProductActionSuccess(data)),
          catchError((error) => of(new UpdateProductActionError(error.message)))
        )
      )
    )
  );

  //Delete Prodcut
  deleteProductsEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductActionsTypes.DELETE_PRODUCT),
      mergeMap((action: ProductsActions) =>
        this.productsService.deleteProdcuts(action.payload).pipe(
          // Passez l'objet produit complet
          map(() => new DeleteProductActionSuccess(action.payload)),
          catchError((error) => of(new DeleteProductActionError(error.message)))
        )
      )
    )
  );
}
