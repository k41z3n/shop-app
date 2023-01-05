import { createContext } from 'react';
import { ICartProduct, IShippingAddress } from '../../interfaces';

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
    createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as contextProps);