import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './store/items.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './store/products.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideStore({
        items: itemsReducer,
        products: productReducer
    }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects(ProductsEffects)]
};
