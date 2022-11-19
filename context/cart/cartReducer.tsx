
import { ICartProduct } from "../../interfaces"
import { CartState } from "."

type CartActionType =
    | { type: 'Cart - loadData', payload: ICartProduct[] }
    | { type: 'Cart - addProduct', payload: ICartProduct[] }


export const cartReducer = (state: CartState, action: CartActionType) => {

    switch (action.type) {
        case 'Cart - loadData':

            return {
                ...state,
            }
        case 'Cart - addProduct':
            return {
                ...state,
                cart: action.payload
            }

        default:
            return state
    }

}