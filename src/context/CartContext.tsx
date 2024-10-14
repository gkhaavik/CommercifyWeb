"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateCartItemQuantity: (productId: number, newQuantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.productId === product.productId);
            if (existingItem) {
                return currentCart.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...currentCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(currentCart => currentCart.filter(item => item.productId !== productId));
    };

    const updateCartItemQuantity = (productId: number, newQuantity: number) => {
        setCart(currentCart =>
            currentCart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: Math.max(0, newQuantity) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateCartItemQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}