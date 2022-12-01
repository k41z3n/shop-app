import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from '.';
import { IUser } from '../../interfaces';
import { shopApi } from '../../api';

export interface AuthState {
    isLoggedIn: boolean
    user?: IUser
}


const AUTH_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined
};


export const AuthProvider: FC<PropsWithChildren<AuthState>> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter()

    useEffect(() => {
        checkToken()
    }, [])


    const checkToken = async () => {

        if (!Cookies.get('toket')) return

        try {
            const { data } = await shopApi.get('/user/validate-token')
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: 'Auth - Login', payload: user })

        } catch (error) {
            Cookies.remove('token')
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {

            const { data } = await shopApi.post('/user/login', { email, password })
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: 'Auth - Login', payload: user })
            return true

        } catch (error) {
            return false
        }
    }

    const logoutUser = () => {
        // dispatch({ type: 'Auth - Logout' })
        Cookies.remove('token')
        Cookies.remove('cart')
        router.reload()
    }


    const registernUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string; }> => {
        try {

            const { data } = await shopApi.post('/user/register', { name, email, password })
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: 'Auth - Login', payload: user })
            return {
                hasError: false,
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: "error on register"
            }

        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            //Methods
            loginUser,
            registernUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};