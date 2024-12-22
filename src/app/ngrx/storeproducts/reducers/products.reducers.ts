import { Action } from '@ngrx/store';
import { Product } from '../../../models/product';
import {
  ProductsActions,
  GetAllProductsAction,
  ProductActionsTypes,
} from '../actions/prodcuts.actions';

// Pour avoir l'etat
export enum ProductStateEnum {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
  INITIAL = 'Initial',
}

// il faut declarer le statement car le seul qui à le droit à changer le statement
export interface ProductsState {
  // Recuperer la listes de produits

  products: Product[];
  errorMessage: string;
  dataState: ProductStateEnum;
}

// creer le reducer
// initailiz state
const initState: ProductsState = {
  products: [],
  errorMessage: '',
  dataState: ProductStateEnum.INITIAL,
};
// dans le demarage va prendre la valeur state initail par defaut car vide
export function productReducer(
  state = initState,
  action: Action
): ProductsState {
  switch (action.type) {
    // Get all products
    case ProductActionsTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: (<ProductsActions>action).payload,
      };
    case ProductActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    // Get selected products
    case ProductActionsTypes.GET_SELECTED_PRODUCTS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: (<ProductsActions>action).payload,
      };
    case ProductActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    // Get available products
    case ProductActionsTypes.GET_AVALIABLE_PRODUCTS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.GET_AVALIABLE_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: (<ProductsActions>action).payload,
      };
    case ProductActionsTypes.GET_AVALIABLE_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    // Search products
    case ProductActionsTypes.SEARCH_PRODUCTS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: (<ProductsActions>action).payload,
      };
    case ProductActionsTypes.SEARCH_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    // New product
    case ProductActionsTypes.NEW_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: [...state.products, (<ProductsActions>action).payload], // Add new product to the list
      };
    case ProductActionsTypes.NEW_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    // Selected product change status
    case ProductActionsTypes.SELECTED_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.SELECTED_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: state.products.map((product) =>
          product.id === (<ProductsActions>action).payload.id
            ? { ...product, selected: true }
            : product
        ),
      };
    case ProductActionsTypes.SELECTED_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    // Available product change status
    case ProductActionsTypes.AVAILIABLE_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.AVAILIABLE_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: state.products.map((product) =>
          product.id === (<ProductsActions>action).payload.id
            ? { ...product, available: true }
            : product
        ),
      };
    case ProductActionsTypes.AVAILIABLE_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    // Update product
    case ProductActionsTypes.UPDATE_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: state.products.map((product) =>
          product.id === (<ProductsActions>action).payload.id
            ? { ...product, ...(<ProductsActions>action).payload }
            : product
        ),
      };
    case ProductActionsTypes.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    // Delete product
    case ProductActionsTypes.DELETE_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: state.products.filter(
          (product) => product.id !== (<ProductsActions>action).payload
        ),
      };
    case ProductActionsTypes.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    default:
      return { ...state };
  }
}
