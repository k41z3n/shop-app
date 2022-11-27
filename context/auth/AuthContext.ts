import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface contextProps {
    isLoggedIn: boolean;
    user?: IUser;
    //methos
    loginUser:(email: string, password: string)=> Promise<boolean> 
    registernUser:(name:string, email: string, password: string)=> Promise<{ hasError: boolean; message?: string; }> 
}

export const AuthContext = createContext({} as contextProps);