import { createAction, props } from "@ngrx/store";

export const increment = createAction('[Counter Component] Increment', props<{multiply: number}>());
export const decrement = createAction('[Counter Component] Decrement', props<{reducer: number}>());
export const reset = createAction('[Counter Component] Reset');
