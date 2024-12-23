import { Action } from '@ngrx/store';
import { Product } from '../../../models/product';

// Enumerateur pour le buttons des products
export enum ProductActionsTypes {
  // chaque action à trois type erreur et success

  GET_ALL_PRODUCTS = '[Products] Get All products',
  GET_ALL_PRODUCTS_SUCCESS = '[Products] Get All products successfully',
  GET_ALL_PRODUCTS_ERROR = '[Products] Get All products Error',

  GET_SELECTED_PRODUCTS = '[Product] Get Selected products',
  GET_SELECTED_PRODUCTS_SUCCESS = '[Products] Get Selected products successfully',
  GET_SELECTED_PRODUCTS_ERROR = '[Products] Get Selected products Error',

  GET_AVALIABLE_PRODUCTS = '[Product] Get Available products',
  GET_AVALIABLE_PRODUCTS_SUCCESS = '[Products] Get Available products successfully',
  GET_AVALIABLE_PRODUCTS_ERROR = '[Products] Get Available products Error',

  SEARCH_PRODUCTS = '[Product] Serearch Products',
  SEARCH_PRODUCTS_SUCCESS = '[Products] Serearch Products successfully',
  SEARCH_PRODUCTS_ERROR = '[Products] Serearch Products Error',

  NEW_PRODUCT = '[Product] New Product',
  NEW_PRODUCT_SUCCESS = '[Product] Get Selected products successfully',
  NEW_PRODUCT_ERROR = '[Product] Get Selected products Error',

  // Product List
  SELECTED_PRODUCT = '[Product] Selected Product',
  SELECTED_PRODUCT_SUCCESS = '[Products] New Product successfully',
  SELECTED_PRODUCT_ERROR = '[Products] New Product products Error',

  AVAILIABLE_PRODUCT = '[Product] Avaliable Selected Product',
  AVAILIABLE_PRODUCT_SUCCESS = '[Products] Avaliable Selected successfully',
  AVAILIABLE_PRODUCT_ERROR = '[Products] Avaliable Selected Error',

  DELETE_PRODUCT = '[Product] Delete Product',
  DELETE_PRODUCT_SUCCESS = '[Product] Delete Product successfully',
  DELETE_PRODUCT_ERROR = '[Product] Delete Product Error',

  SAVE_PRODUCT = '[Product] Save Product',
  SAVE_PRODUCT_SUCCESS = '[Product] Save Product successfully',
  SAVE_PRODUCT_ERROR = '[Product] Save Product Error',

  //// Edit
  EDIT_PRODUCT = '[Product] EDIT Product',
  EDIT_PRODUCT_SUCCESS = '[Product] Edit product successfully',
  EDIT_PRODUCT_ERROR = '[Product] Edit product Error',

  UPDATE_PRODUCT = '[Product] Update Product',
  UPDATE_PRODUCT_SUCCESS = '[Products] Update Product successfully',
  UPDATE_PRODUCT_ERROR = '[Products] Update Product Error',
}

// For Get Products function
export class GetAllProductsAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.GET_ALL_PRODUCTS;
  constructor(public payload: any) {}
}

export class GetAllProductsActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.GET_ALL_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class GetAllProductsActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.GET_ALL_PRODUCTS_ERROR;
  constructor(public payload: string) {}
}

//////////////
// For Get Selected Product Actions

export class GetSelectedProductsAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.GET_SELECTED_PRODUCTS;
  constructor(public payload: any) {}
}

export class GetSelectedProductsActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class GetSelectedProductsActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.GET_SELECTED_PRODUCTS_ERROR;
  constructor(public payload: string) {}
}
////////////
// For Get Available Products
export class GetAvailableProductsAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.GET_AVALIABLE_PRODUCTS;
  constructor(public payload: any) {}
}

export class GetAvailableProductsActionSuccess implements Action {
  type: ProductActionsTypes =
    ProductActionsTypes.GET_AVALIABLE_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class GetAvailableProductsActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.GET_AVALIABLE_PRODUCTS_ERROR;
  constructor(public payload: string) {}
}

/////////
// Serach Prodcts

export class SerearchProductAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.SEARCH_PRODUCTS;
  constructor(public payload: string) {}
}

export class SerearchProductActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.SEARCH_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class SerearchProductActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.SEARCH_PRODUCTS_ERROR;
  constructor(public payload: string) {}
}

/////////
// For New Products

export class NewProductAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.NEW_PRODUCT;
  constructor(public payload: any) {}
}

export class NewProductActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.NEW_PRODUCT_SUCCESS;
  constructor(public payload: any) {}
}

export class NewProductActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.NEW_PRODUCT_ERROR;
  constructor(public payload: string) {}
}

////////
// For Selected Product change button

export class SelectedProductAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.SELECTED_PRODUCT;
  constructor(public payload: Product) {}
}

export class SelectedProductActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.SELECTED_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class SelectedProductActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.SELECTED_PRODUCT_ERROR;
  constructor(public payload: string) {}
}

/////////
// for avaliable change button

export class AvaliableSelectedProductAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.AVAILIABLE_PRODUCT;
  constructor(public payload: Product) {}
}

export class AvaliableSelectedProductActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.AVAILIABLE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class AvaliableSelectedProductActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.AVAILIABLE_PRODUCT_ERROR;
  constructor(public payload: string) {}
}

////////
// for update produt

export class UpdateProductAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.UPDATE_PRODUCT;
  constructor(public payload: Product) {}
}

export class UpdateProductActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class UpdateProductActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.UPDATE_PRODUCT_ERROR;
  constructor(public payload: string) {}
}

///////////////
// for delete products

export class DeleteProductAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.DELETE_PRODUCT;
  constructor(public payload: Product) {}
}

export class DeleteProductActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.DELETE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class DeleteProductActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.DELETE_PRODUCT_ERROR;
  constructor(public payload: string) {}
}

////
// for Save products

export class SaveProductAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.SAVE_PRODUCT;
  constructor(public payload: Product) {}
}

export class SaveProductActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.SAVE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class SaveProductActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.SAVE_PRODUCT_ERROR;
  constructor(public payload: string) {}
}

/////////
// For EDIT Products

// get By ID
export class EditProductAction implements Action {
  type: ProductActionsTypes = ProductActionsTypes.EDIT_PRODUCT;
  constructor(public payload: number) {}
}

export class EditProductActionSuccess implements Action {
  type: ProductActionsTypes = ProductActionsTypes.EDIT_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class EditProductActionError implements Action {
  type: ProductActionsTypes = ProductActionsTypes.EDIT_PRODUCT_ERROR;
  constructor(public payload: string) {}
}

// Pour utiliser ces types
export type ProductsActions =
  | GetAllProductsAction
  | GetAllProductsActionSuccess
  | GetAllProductsActionError
  // selected Get
  | GetSelectedProductsAction
  | GetSelectedProductsActionSuccess
  | GetSelectedProductsActionError
  // Avaliable Get
  | GetAvailableProductsAction
  | GetAvailableProductsActionSuccess
  | GetAvailableProductsActionError
  // Search Product
  | SerearchProductAction
  | SerearchProductActionSuccess
  | SerearchProductActionError
  // New Product
  | NewProductAction
  | NewProductActionSuccess
  | NewProductActionError
  // Select Product Change
  | SelectedProductAction
  | SelectedProductActionSuccess
  | SelectedProductActionError
  // Avaliable Change product
  | AvaliableSelectedProductAction
  | AvaliableSelectedProductActionSuccess
  | AvaliableSelectedProductActionError
  // Update Product
  | UpdateProductAction
  | UpdateProductActionSuccess
  | UpdateProductActionError
  // Delete Prodcut
  | DeleteProductAction
  | DeleteProductActionSuccess
  | DeleteProductActionError
  // Save Product
  | SaveProductAction
  | SaveProductActionSuccess
  | SaveProductActionError
  // Edit Product
  | EditProductAction
  | EditProductActionSuccess
  | EditProductActionError;
