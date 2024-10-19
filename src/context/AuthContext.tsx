"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authorizeUser, loginUser, registerUser } from '@/lib/authApi';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const authorized = await authorizeUser(token);
                setUser(authorized);
            } catch (error) {
                console.error('Authorization failed:', error);
                localStorage.removeItem('token');
            }
        }
        setIsLoading(false);
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await loginUser(email, password);
            localStorage.setItem('token', response.token);
            setUser(response.user);

            router.push('/admin');

        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Login failed');
        }
    };

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        try {
            const response = await registerUser({ email, password, firstName, lastName });
            localStorage.setItem('token', response.token);
            setUser(response.user);
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error('Registration failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/admin/login');
    };

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}