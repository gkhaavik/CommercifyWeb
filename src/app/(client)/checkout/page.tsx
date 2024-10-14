"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/ordersApi';
import LoginForm from '@/components/Client/LoginForm';
import RegisterForm from '@/components/Client/RegisterForm';

export default function Checkout() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, isAuthenticated, login, register } = useAuth();
    const { cart, clearCart, totalPrice } = useCart();
    const [showLogin, setShowLogin] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (cart.length === 0) {
            router.push('/');
        }
    }, [cart, router]);

    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await login(email, password);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (email: string, password: string, firstName: string, lastName: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await register(email, password, firstName, lastName);
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckout = async () => {
        if (!isAuthenticated || !user) {
            setError('Please log in to complete your purchase.');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await createOrder(user.userId, cart);
            clearCart();
            router.push('/order-confirmation');
        } catch (err) {
            setError('Failed to create order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <div className="max-w-md mx-auto">
                    {showLogin ? (
                        <>
                            <LoginForm onSubmit={handleLogin} />
                            <p className="mt-4 text-center">
                                Don&apos;t have an account?{' '}
                                <button
                                    onClick={() => setShowLogin(false)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Register
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <RegisterForm onSubmit={handleRegister} />
                            <p className="mt-4 text-center">
                                Already have an account?{' '}
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Log in
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {cart.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center mb-2">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="border-t pt-4 mt-4">
                    <strong className="text-xl">
                        Total: ${totalPrice.toFixed(2)}
                    </strong>
                </div>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors w-full"
            >
                {isLoading ? 'Processing...' : 'Complete Purchase'}
            </button>
        </div>
    );
}