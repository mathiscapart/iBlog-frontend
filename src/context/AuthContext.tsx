import {createContext, useContext} from "react";
import {AuthContextType} from "../interface/AuthContext.tsx";

export const authContextDefaultValues: AuthContextType = {
    user: null,
    login: () => {},
    logout: () => {},
}

export const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuthContext(){
    return useContext(AuthContext);
}

export default AuthContext;