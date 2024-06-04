import { createReducer, on } from "@ngrx/store"
import { findAll, load } from "./products.actions"

const products: any[] = [];
const initialState = {
    products
}

export const productReducer = createReducer(
    initialState,
    on(load, (state) => {
        return{
            products: [... state.products]
        }
    }),
    on(findAll, (state, payload) => {
        return{
            products: [... payload.products]
        }
    })
)