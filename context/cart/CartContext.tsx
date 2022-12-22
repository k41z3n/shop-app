import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { IShippingAddress } from './CartProvider';

interface contextProps {
    hasProducts: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: IShippingAddress
    //Methos;
    updateCart: (productCart: ICartProduct) => void;
    updateCartProduct: (productCart: ICartProduct) => void;
    removeCartProduct: (productCart: ICartProduct) => void;
    storeShippingAddress: (shippingAddress: IShippingAddress) => void;
}

export const CartContext = createContext({} as contextProps);