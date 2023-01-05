import { FC, useReducer, PropsWithChildren, useEffect } from 'react';

import Cookie from 'js-cookie'

import { ICartProduct, IOrder, IShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from '.';

import { shopApi } from "../../api";
import axios from 'axios';


export interface CartState {
    hasProducts: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: IShippingAddress
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


    const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {
        if (!state.shippingAddress) throw new Error("empty shipping Address");

        const body: IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false,
        }

        try {
            const { data } = await shopApi.post<IOrder>('/order', body)

            dispatch({ type: 'Cart - order complete' })

            return { hasError: false, message: data._id! }

        } catch (error) {
            if (axios.isAxiosError(error)) return { hasError: true, message: error.response?.data.message }
            return {
                hasError: true,
                message: 'Error unknown!!!'
            }
        }
    }

    return (
        <CartContext.Provider value={{
            ...state,
            //Methods
            updateCart,
            updateCartProduct,
            removeCartProduct,
            storeShippingAddress,
            createOrder
        }}>
            {children}
        </CartContext.Provider>
    );
};