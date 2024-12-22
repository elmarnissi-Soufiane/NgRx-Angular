import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { EditFormComponent } from './pages/edit-form/edit-form.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'newProduct',
    component: ProductFormComponent,
  },
  {
    path: 'editProduct/:id',
    component: EditFormComponent,
  },
];
