'use client';

import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode
} from 'react';
import Header from "@/components/Header";

interface AuthContextType {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, loading, setLoading}}>
            <Header/>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
