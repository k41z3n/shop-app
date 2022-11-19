import { FC, useReducer, PropsWithChildren } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from '.';


export interface CartState {
    cart: ICartProduct[];
}


const CART_INITIAL_STATE = {
    cart: [],
};


export const CartProvider: FC<PropsWithChildren<CartState>> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    const updateCart = (product: ICartProduct) => {

        const { cart: currentCart } = state

        let alReadyInCart = currentCart.find(({ _id }) => _id === product._id)

        if (alReadyInCart) {
            // alReadyInCart.size = product.size
            // alReadyInCart.quantity = product.quantity
            alReadyInCart = { ...product }
        } else {
            currentCart.push(product)
        }

        dispatch({ type: 'Cart - addProduct', payload: currentCart })
    }


    return (
        <CartContext.Provider value={{
            ...state,
            //Methods
            updateCart
        }}>
            {children}
        </CartContext.Provider>
    );
};