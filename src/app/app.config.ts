import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './ngrx/storeproducts/reducers/products.reducers';
import { ProductsEffectts } from './ngrx/storeproducts/effects/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    HttpClientModule,
    //provideStore(),
    provideStore({
      catalogueState: productReducer, // appel du fonction de reducers continet tous les actions qui on utiliser sur store pour recupere donnes
    }),
    provideEffects([ProductsEffectts]), // en mettre la calass Injectable d'effect
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
  ],
};
