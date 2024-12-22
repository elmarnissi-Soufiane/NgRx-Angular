import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../models/product';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionsTypes,
} from '../../state/product.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductNavbarComponent } from './product-navbar/product-navbar.component';
import { ProductListComponent } from '../../pages/product-list/product-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductNavbarComponent,
    ProductListComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // recuperer les products
  onGetAllProducts() {
    console.log('start');
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      // pour qui va retourne ou debut de la requete
      startWith({ dataState: DataStateEnum.LOADIN }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  // function for submit form
  onSerach(dataForm: any) {
    // to get keyword in input dataForm.keyword
    console.log(dataForm.keyword);
    this.products$ = this.productsService.searchProduts(dataForm.keyword).pipe(
      map((data) => {
        console.log('deux', data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      // pour qui va retourne ou debut de la requete
      startWith({ dataState: DataStateEnum.LOADIN }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  // delete  product
  onDeleteProduct(product: Product) {
    console.log('delete product', product);

    let confirme = confirm('Are you sure you want to delete this product');
    if (confirme) {
      let deleted = this.productsService.deleteProdcuts(product);
      deleted.subscribe((data) => {
        this.onGetAllProducts();
      });
    }
  }

  // update product
  onUpdateProduct(product: Product) {
    console.log('update product', product);
    this.router.navigateByUrl('/editProduct/' + product.id);
  }

  // create product
  onNewProduct() {
    // use router there to navigate to form Add
    this.router.navigateByUrl('/newProduct');
  }

  /////////////////////////////////////////
  // get product selected
  onGetSelectedProduct() {
    console.log('start');
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      // pour qui va retourne ou debut de la requete
      startWith({ dataState: DataStateEnum.LOADIN }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSelectProduct(product: Product) {
    console.log('select from compo', product);
    let select = this.productsService.onSelectProduct(product);
    select.subscribe((data) => {
      product.selected = data.selected;
    });
  }

  /// get Availibale
  onGetAvaiableProduct() {
    console.log('start');
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      // pour qui va retourne ou debut de la requete
      startWith({ dataState: DataStateEnum.LOADIN }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onAvaliableProduct(product: Product) {
    let avaliable = this.productsService.onAvailableProduct(product);
    avaliable.subscribe((data) => {
      product.available = data.available;
    });
  }

  // pour faire event parent to children
  onActionEvent($event: ActionEvent): void {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;

      case ProductActionsTypes.GET_SELECTED_PRODUCTS:
        this.onGetSelectedProduct();
        break;

      case ProductActionsTypes.GET_AVALIABLE_PRODUCTS:
        this.onGetAvaiableProduct();
        break;

      case ProductActionsTypes.SEARCH_PRODUCTS:
        if ($event.payload && $event.payload.keyword) {
          this.onSerach({ keyword: $event.payload.keyword });
        }
        break;

      case ProductActionsTypes.NEW_PRODUCT:
        this.onNewProduct();
        break;

      case ProductActionsTypes.SELECTED_PRODUCT:
        this.onSelectProduct($event.payload);
        break;

      case ProductActionsTypes.AVAILIABLE_PRODUCT:
        this.onAvaliableProduct($event.payload);
        break;

      case ProductActionsTypes.UPDATE_PRODUCT:
        this.onUpdateProduct($event.payload);
        break;
      case ProductActionsTypes.DELETE_PRODUCT:
        this.onDeleteProduct($event.payload);
        break;

      default:
        console.error('Action non reconnue :', $event.type);
        break;
    }
  }
}
