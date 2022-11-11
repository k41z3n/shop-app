import { createContext } from 'react';

interface contextProps {
    isMenuOpen: boolean
    //methods
    toggeSideMenu: () => void
}

export const UiContext = createContext({} as contextProps);