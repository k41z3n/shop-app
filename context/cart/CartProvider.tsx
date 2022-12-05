import { FC, useReducer, PropsWithChildren, useEffect } from 'react';

import Cookie from 'js-cookie'

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from '.';

export interface CartState {
    hasProducts: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}


const CART_INITIAL_STATE = {
    hasProducts: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
};


export const CartProvider: FC<PropsWithChildren<CartState>> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            const cookieCart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []

            dispatch({ type: 'Cart - loadData from cookies', payload: cookieCart })
        } catch {
            dispatch({ type: 'Cart - loadData from cookies', payload: [] })
        }
    }, [])

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])


    useEffect(() => {

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)

        const subTotal = state.cart.reduce((prev, current) => ((current.price * current.quantity) + prev), 0)

        const OrderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({ type: 'Cart - update order summary', payload: OrderSummary })

    }, [state.cart])


    const updateCart = (product: ICartProduct) => {

        const productsInCart = state.cart.some(p => p._id === product._id)
        if (!productsInCart) return dispatch({ type: 'Cart - updateCart', payload: [...state.cart, product] })

        const productInCartButDiferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
        if (!productInCartButDiferentSize) return dispatch({ type: 'Cart - updateCart', payload: [...state.cart, product] })

        const updateCart = state.cart.map(p => {
            if (p._id !== product._id) return p
            if (p.size !== product.size) return p

            p.quantity = product.quantity
            return p
        })

        dispatch({ type: 'Cart - updateCart', payload: updateCart })
    }

    const updateCartProduct = (product: ICartProduct) => {
        dispatch({ type: 'Cart - update Product in Cart', payload: product })
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: 'Cart - remove Product in Cart', payload: product })
    }

    return (
        <CartContext.Provider value={{
            ...state,
            //Methods
            updateCart,
            updateCartProduct,
            removeCartProduct
        }}>
            {children}
        </CartContext.Provider>
    );
};