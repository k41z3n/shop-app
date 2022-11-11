import { FC, useReducer, PropsWithChildren } from 'react';
import { UiContext, uiReducer } from './';


export interface UiState {
    isMenuOpen: boolean;
}


const UI_INITIAL_STATE = {
    isMenuOpen: false,
};


export const UiProvider: FC<PropsWithChildren<UiState>> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggeSideMenu = () => {
        dispatch({ type: 'UI - toogleMenu' })
    }

    return (
        <UiContext.Provider value={{
            ...state,
            //methods
            toggeSideMenu
        }}>
            {children}
        </UiContext.Provider>
    );
};