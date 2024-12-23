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
  NEW = 'New',
  EDIT = 'Edit',
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
        products: Array.isArray((<ProductsActions>action).payload)
          ? (<ProductsActions>action).payload
          : [], // S'assurer que le payload est un tableau
      };
    case ProductActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
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
        products: Array.isArray((<ProductsActions>action).payload)
          ? (<ProductsActions>action).payload
          : [], // S'assurer que le payload est un tableau
      };
    case ProductActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
      };

    // Cas pour d'autres actions similaires (GET_AVALIABLE_PRODUCTS, SEARCH_PRODUCTS, etc.)
    case ProductActionsTypes.GET_AVALIABLE_PRODUCTS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.GET_AVALIABLE_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: Array.isArray((<ProductsActions>action).payload)
          ? (<ProductsActions>action).payload
          : [], // Assurez-vous que le payload est un tableau
      };
    case ProductActionsTypes.GET_AVALIABLE_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
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
        dataState: ProductStateEnum.NEW,
        products: Array.isArray((<ProductsActions>action).payload)
          ? [...state.products, ...(<ProductsActions>action).payload]
          : state.products, // Ajouter un produit en s'assurant que c'est un tableau
      };
    case ProductActionsTypes.NEW_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
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
        products: [], // Vider les produits en cas d'erreur
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
          (product) => product.id !== (<ProductsActions>action).payload.id
        ),
      };
    case ProductActionsTypes.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
      };

    // Ajouter un produit
    case ProductActionsTypes.SAVE_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
      };
    case ProductActionsTypes.SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: Array.isArray([
          ...state.products,
          (<ProductsActions>action).payload,
        ])
          ? [...state.products, (<ProductsActions>action).payload]
          : state.products, // Ajouter le produit en s'assurant que c'est un tableau
      };
    case ProductActionsTypes.SAVE_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
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
        products: [], // Vider les produits en cas d'erreur
      };

    // Par défaut
    default:
      return { ...state };
  }
}
