import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface contextProps {
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
    //Methos
    updateCart: (productCart: ICartProduct) => void
    updateCartProduct: (productCart: ICartProduct) => void
    removeCartProduct: (productCart: ICartProduct) => void
}

export const CartContext = createContext({} as contextProps);