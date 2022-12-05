
import { ICartProduct } from "../../interfaces"
import { CartState } from "."

type CartActionType =
    | { type: 'Cart - loadData from cookies', payload: ICartProduct[] }
    | { type: 'Cart - updateCart', payload: ICartProduct[] }
    | { type: 'Cart - update Product in Cart', payload: ICartProduct }
    | { type: 'Cart - remove Product in Cart', payload: ICartProduct }
    | {
        type: 'Cart - update order summary',
        payload: {
            numberOfItems: number
            subTotal: number
            tax: number
            total: number
        }
    }



export const cartReducer = (state: CartState, action: CartActionType) => {

    switch (action.type) {
        case 'Cart - loadData from cookies':

            return {
                ...state,
                hasProducts: true,
                cart: [...action.payload]
            }
        case 'Cart - updateCart':
            return {
                ...state,
                cart: [...action.payload]
            }
        case 'Cart - update Product in Cart':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product
                    if (product.size !== action.payload.size) return product
                    return action.payload
                })
            }
        case 'Cart - remove Product in Cart':
            return {
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
            }
        case 'Cart - update order summary':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }

}