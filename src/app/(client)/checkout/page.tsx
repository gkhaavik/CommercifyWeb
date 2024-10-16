/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/ordersApi';
import HorizontalLoginForm from '@/components/Shared/Auth/HorizontalLoginForm';

export default function Checkout() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, isAuthenticated, login, register } = useAuth();
    const { cart, totalPrice } = useCart();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (cart.length === 0) {
            router.push('/demo');
        }
        if (user) {
            setEmail(user.email);
        }
    }, [cart, router, user]);

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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
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
            await createOrder(user.userId, cart).then((order) => {
                router.push(`/demo/checkout/success/${order.orderId}`);
            });

        } catch (err) {
            setError('Failed to create order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                    {isAuthenticated ? (
                        <div>
                            <p>Logged in as: {user?.email}</p>
                            <p>Name: {user?.firstName} {user?.lastName}</p>
                        </div>
                    ) : (
                        <>
                            <HorizontalLoginForm onLogin={handleLogin} />
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold mb-2">Create an Account</h3>
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                                    >
                                        Register and Checkout
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="bg-gray-100 p-4 rounded">
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
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    <button
                        onClick={handleCheckout}
                        disabled={!isAuthenticated || isLoading}
                        className={`mt-4 w-full px-6 py-3 rounded text-white transition-colors ${isAuthenticated
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isLoading ? 'Processing...' : 'Complete Purchase'}
                    </button>
                </div>
            </div>
        </div>
    );
}