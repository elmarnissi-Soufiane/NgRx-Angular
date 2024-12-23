import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  // recupere une listes des produits
  getAllProducts(): Observable<Product[]> {
    let host = 'http://localhost:3000';
    // let validHost = 'http://localhost:3000';
    // let failedHots = 'http://localhost:3008';

    //let host = Math.random() > 0.2 ? validHost : failedHots;
    //let host = environment.host;
    console.log(host);
    let data = this.http.get<Product[]>(host + '/products');
    console.log('products', data);
    return data;
  }
  // Methode search
  searchProduts(keyword: string): Observable<Product[]> {
    //let host = environment.host;
    let host = 'http://localhost:3000';
    // let validHost = 'http://localhost:3000';
    // let failedHots = 'http://localhost:8000';
    // let host = Math.random() > 0.2 ? validHost : failedHots;
    return this.http.get<Product[]>(host + '/products?name=' + keyword);
    // console.log('search', sr);
    // return sr;
  }

  // delete Produt

  deleteProdcuts(product: Product): Observable<void> {
    const host = 'http://localhost:3000';
    return this.http.delete<void>(`${host}/products/${product.id}`).pipe(
      catchError((error) => {
        console.error('Error deleting product:', error);
        return throwError(() => new Error('Unable to delete product'));
      })
    );
  }

  // save Product Ajouter
  saveProduct(product: Product): Observable<Product> {
    let host = 'http://localhost:3000';
    return this.http.post<Product>(host + '/products', product);
  }

  // edit
  getProductById(id: number): Observable<Product> {
    let host = 'http://localhost:3000';
    return this.http.get<Product>(host + '/products/' + id);
  }
  // update
  updateProduct(product: Product): Observable<Product> {
    let host = 'http://localhost:3000';
    return this.http.put<Product>(host + '/products/' + product.id, product);
  }

  ////////////////

  // get Selected
  getSelectedProducts(): Observable<Product[]> {
    //let host = environment.host;
    let validHost = 'http://localhost:3000';
    let failedHots = 'http://localhost:8000';
    let host = Math.random() > 0.2 ? validHost : failedHots;
    return this.http.get<Product[]>(host + '/products?selected=true');
  }

  // onSelectProduct

  onSelectProduct(product: Product): Observable<Product> {
    console.log('Product selected service', product);

    const host = 'http://localhost:3000'; // Utilisez environment.apiUrl en production.
    const updatedProduct = { ...product, selected: !product.selected }; // Crée une copie et modifie "selected".

    return this.http
      .put<Product>(`${host}/products/${updatedProduct.id}`, updatedProduct)
      .pipe(
        catchError((error) => {
          console.error('Error updating product:', error);
          return throwError(() => new Error('Unable to update product'));
        })
      );
  }

  // get available
  getAvailableProducts(): Observable<Product[]> {
    //let host = environment.host;
    let host = 'http://localhost:3000';
    return this.http.get<Product[]>(host + '/products?available=true');
  }

  // select avaiblable Prudt

  onAvailableProduct(product: Product): Observable<Product> {
    console.log('Available product service', product);

    const host = 'http://localhost:3000'; // Recommandé : Utilisez des fichiers d'environnement pour stocker les URL.

    // Créer une copie du produit pour éviter de modifier un objet immuable
    const updatedProduct = { ...product, available: !product.available };

    return this.http
      .put<Product>(host + '/products/' + updatedProduct.id, updatedProduct)
      .pipe(
        catchError((error) => {
          console.error('Error updating available status:', error);
          return throwError(
            () => new Error('Unable to update availability status')
          );
        })
      );
  }
}
