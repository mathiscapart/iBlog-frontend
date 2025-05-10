import {useState, useEffect} from "react";
import {User} from "../interface/User.tsx";
import {jwtDecode} from "jwt-decode";
import {AuthProviderProps} from "../interface/AuthProvider.tsx";
import AuthContext, {authContextDefaultValues} from "../context/AuthContext.tsx";

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(authContextDefaultValues.user);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token", token);
        if (token) {
            try {
                const decoded: User = jwtDecode(token);
                setUser(decoded);
                console.log(decoded);
            } catch (error: unknown) {
                localStorage.removeItem('token');
                console.error("Erreur dans handleSubmit :", error);
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decoded: User = jwtDecode(token);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
