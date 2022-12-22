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
    shippingAddress?: IShippingAddress
}

export interface IShippingAddress {
    firstName: string;
    lastName: string;
    direction: string;
    direction2?: string;
    code: string;
    city: string;
    phone: string;
}


const CART_INITIAL_STATE = {
    hasProducts: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
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

    useEffect(() => {
        if (Cookie.get('firstName')) {
            const shippingAddress = {
                firstName: Cookie.get('firstName') || '',
                lastName: Cookie.get('lastName') || '',
                direction: Cookie.get('direction') || '',
                direction2: Cookie.get('direction2') || '',
                code: Cookie.get('code') || '',
                city: Cookie.get('city') || '',
                phone: Cookie.get('phone') || '',
            }

            dispatch({ type: 'Cart - store shipping address', payload: shippingAddress })
        }

    }, [])


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

    const storeShippingAddress = (address: IShippingAddress) => {
        Cookie.set("firstName", address.firstName)
        Cookie.set("lastName", address.lastName)
        Cookie.set("direction", address.direction)
        Cookie.set("direction2", address?.direction2 || '')
        Cookie.set("code", address.code)
        Cookie.set("city", address.city)
        Cookie.set("phone", address.phone)

        dispatch({ type: 'Cart - store shipping address', payload: address })
    }

    return (
        <CartContext.Provider value={{
            ...state,
            //Methods
            updateCart,
            updateCartProduct,
            removeCartProduct,
            storeShippingAddress
        }}>
            {children}
        </CartContext.Provider>
    );
};