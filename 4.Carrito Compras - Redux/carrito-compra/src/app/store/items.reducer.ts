import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { add, remove, total } from "./items.actions";

export interface ItemsState { // Definimos la interfaz ItemsState
    items: CartItem[], // Un array de objetos CartItem
    total: number // El total de los precios de los items
}

export const initialState: ItemsState = { // Definimos el estado inicial
    items: JSON.parse(sessionStorage.getItem('cart')!) || [], // Intentamos obtener los items del carrito de la sesión o inicializamos un array vacío
    total: 0 // Inicializamos el total a 0
}

export const itemsReducer = createReducer( // Creamos el reducer
    initialState, // Pasamos el estado inicial
    on(add, (state, { product }) => { // Manejador para la acción 'add'
        const hasItem = state.items.find((item: CartItem) => item.product.id == product.id); // Verificamos si el producto ya está en el carrito

        if (hasItem) { // Si el producto ya está en el carrito
            return {
                items: state.items.map((item: CartItem) => { // Mapeamos los items
                    if (item.product.id == product.id) { // Si el id del producto coincide con el id del item
                        return {
                            ...item, // Copiamos todas las propiedades del item
                            quantity: item.quantity + 1 // Incrementamos la cantidad en 1
                        };
                    }
                    return item; // Devolvemos el item sin cambios
                }),
                total: state.total // Mantenemos el total sin cambios
            }
        } else { // Si el producto no está en el carrito
            return {
                items: [...state.items, { product: { ...product }, quantity: 1 }], // Añadimos el nuevo producto al carrito con cantidad 1
                total: state.total // Mantenemos el total sin cambios
            }
        }
    }),
    on(remove, (state, { id }) => { // Manejador para la acción 'remove'
        return {
            items: state.items.filter(item => item.product.id != id), // Filtramos los items para eliminar el que tenga el id proporcionado
            total: state.total // Mantenemos el total sin cambios
        }
    }),
    on(total, state => { // Manejador para la acción 'total'
        return {
            items: state.items, // Mantenemos los items sin cambios
            total: state.items.reduce((acumulator, item) =>  // Calculamos el total sumando el precio de cada producto multiplicado por su cantidad
                acumulator + item.quantity * item.product.price, 0)
        }
    })
)
