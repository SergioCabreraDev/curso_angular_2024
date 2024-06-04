import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "./items.actions";

export const initialState = 0;

export const counterReducer = createReducer(
    initialState,
    on(increment, (state, {multiply}) => state + multiply),
    on(decrement, (state, {reducer}) => state - reducer),
    on(reset, (state) => {
        return state = 0;
    })

)

