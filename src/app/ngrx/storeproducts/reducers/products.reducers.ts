import { Action } from '@ngrx/store';
import { Product } from '../../../models/product';
import {
  ProductActionsTypes,
  ProductsActions,
} from '../actions/prodcuts.actions';

// Pour avoir l'etat
export enum ProductStateEnum {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
  INITIAL = 'Initial',
  NEW = 'New',
  EDIT = 'Edit',
  UPDATED = 'Updated',
}

// il faut declarer le statement car le seul qui à le droit à changer le statement
export interface ProductsState {
  // Recuperer la listes de produits

  products: Product[];
  errorMessage: string;
  dataState: ProductStateEnum;

  // pour la modification on va utiliser un currect product qui prend le produit en method getProdictByID
  currectProductUpdate: Product | null;

  // pour recuperer l'action qui recoit en click ou bien depuis un evenement
  currentAction: ProductsActions | null;
}

// creer le reducer
// initailiz state
const initState: ProductsState = {
  products: [],
  errorMessage: '',
  dataState: ProductStateEnum.INITIAL,
  // user le produit la
  currectProductUpdate: null,

  // initialization de current action
  currentAction: null,
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
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: Array.isArray((<ProductsActions>action).payload)
          ? (<ProductsActions>action).payload
          : [], // S'assurer que le payload est un tableau
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
        currentAction: <ProductsActions>action,
      };

    // Get selected products
    case ProductActionsTypes.GET_SELECTED_PRODUCTS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: Array.isArray((<ProductsActions>action).payload)
          ? (<ProductsActions>action).payload
          : [], // S'assurer que le payload est un tableau
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [],
        currentAction: <ProductsActions>action, // Vider les produits en cas d'erreur
      };

    // GET_AVALIABLE_PRODUCTS
    case ProductActionsTypes.GET_AVALIABLE_PRODUCTS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.GET_AVALIABLE_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: Array.isArray((<ProductsActions>action).payload)
          ? (<ProductsActions>action).payload
          : [], // Assurez-vous que le payload est un tableau
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.GET_AVALIABLE_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
        currentAction: <ProductsActions>action,
      };

    // New product
    case ProductActionsTypes.NEW_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.NEW,
        products: Array.isArray((<ProductsActions>action).payload)
          ? [...state.products, ...(<ProductsActions>action).payload]
          : state.products, // Ajouter un produit en s'assurant que c'est un tableau
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.NEW_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
        currentAction: <ProductsActions>action,
      };

    // Edit Product
    case ProductActionsTypes.EDIT_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        currectProductUpdate: (<ProductsActions>action).payload,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.EDIT_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [],
        currentAction: <ProductsActions>action,
      };

    // Update product
    case ProductActionsTypes.UPDATE_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.UPDATE_PRODUCT_SUCCESS:
      let updateProduct: Product = (<ProductsActions>action).payload;
      let updateProductsList = state.products.map((p) =>
        p.id == updateProduct.id ? updateProduct : p
      );
      return {
        ...state,
        dataState: ProductStateEnum.UPDATED,
        products: updateProductsList,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        currentAction: <ProductsActions>action,
      };

    // Delete product
    case ProductActionsTypes.DELETE_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: state.products.filter(
          (product) => product.id !== (<ProductsActions>action).payload.id
        ),
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
        currentAction: <ProductsActions>action,
      };

    // Ajouter un produit
    case ProductActionsTypes.SAVE_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
        currentAction: <ProductsActions>action,
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
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.SAVE_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
        currentAction: <ProductsActions>action,
      };

    // Search products
    case ProductActionsTypes.SEARCH_PRODUCTS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED,
        products: (<ProductsActions>action).payload,
        currentAction: <ProductsActions>action,
      };
    case ProductActionsTypes.SEARCH_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
        products: [], // Vider les produits en cas d'erreur
        currentAction: <ProductsActions>action,
      };

    case ProductActionsTypes.SELECTED_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING, // Indique le chargement.
        currentAction: <ProductsActions>action,
      };

    case ProductActionsTypes.SELECTED_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED, // Indique que l'action a réussi.
        products: state.products.map((product) =>
          product.id === (<ProductsActions>action).payload.id
            ? (<ProductsActions>action).payload // Met à jour le produit sélectionné.
            : product
        ),
        currentAction: <ProductsActions>action,
      };

    case ProductActionsTypes.SELECTED_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR, // Indique une erreur.
        errorMessage: (<ProductsActions>action).payload, // Ajoute un message d'erreur.
        currentAction: <ProductsActions>action,
      };

    case ProductActionsTypes.AVAILIABLE_PRODUCT:
      return {
        ...state,
        dataState: ProductStateEnum.LOADING, // Indique le chargement.
        currentAction: <ProductsActions>action,
      };

    case ProductActionsTypes.AVAILIABLE_PRODUCT_SUCCESS:
      return {
        ...state,
        dataState: ProductStateEnum.LOADED, // Indique que l'action a réussi.
        products: state.products.map((product) =>
          product.id === (<ProductsActions>action).payload.id
            ? (<ProductsActions>action).payload // Met à jour le produit disponible.
            : product
        ),
        currentAction: <ProductsActions>action,
      };

    case ProductActionsTypes.AVAILIABLE_PRODUCT_ERROR:
      return {
        ...state,
        dataState: ProductStateEnum.ERROR, // Indique une erreur.
        errorMessage: (<ProductsActions>action).payload, // Ajoute un message d'erreur.
        currentAction: <ProductsActions>action,
      };

    // Par défaut
    default:
      return { ...state };
  }
}
