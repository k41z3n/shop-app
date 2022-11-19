import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface contextProps {
    cart: ICartProduct[]
    //Methos
    updateCart: (productCart: ICartProduct) => void
}

export const CartContext = createContext({} as contextProps);