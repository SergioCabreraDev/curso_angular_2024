import { Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of } from "rxjs";
import { findAll, load } from "../products.actions";


@Injectable()
export class ProductsEffects {


    loadProduct$ = createEffect(  // Definimos un efecto con createEffect
    () => this.actions$.pipe(  // La función flecha devuelve un observable transformado por una cadena de operadores RxJS
        ofType(load),  // El operador ofType filtra las acciones, permitiendo solo las de tipo 'load'
        exhaustMap(() =>  // El operador exhaustMap maneja la llamada asíncrona, desechando nuevas acciones 'load' si una ya está en progreso
            this.service.findAll().pipe(  //Llamamos al método findAll del servicio que devuelve un Observable<Product[]>
                map(products => findAll({ products }))  // Transformamos el Observable<Product[]> en una acción findAll con los productos
            )
        )
    )
);

    
    

    constructor(
        private actions$: Actions,
        private service: ProductService
    ) { }





}