import React, { useState } from 'react';
import { CartItem } from '@/types';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

interface CompactCartProps {
    cart: CartItem[];
    updateCartItemQuantity: (productId: number, newQuantity: number) => void;
    removeFromCart: (productId: number) => void;
    onCheckout: () => void;
}

export default function CompactCart({
    cart,
    updateCartItemQuantity,
    removeFromCart,
    onCheckout
}: CompactCartProps) {
    const [isOpen, setIsOpen] = useState(false);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    const toggleCart = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            <CartSummary
                totalItems={totalItems}
                totalPrice={totalPrice}
                onClick={toggleCart}
            />
            {isOpen && (
                <CartDetails
                    cart={cart}
                    updateCartItemQuantity={updateCartItemQuantity}
                    removeFromCart={removeFromCart}
                    totalPrice={totalPrice}
                    onCheckout={onCheckout}
                />
            )}
        </div>
    );
}

interface CartSummaryProps {
    totalItems: number;
    totalPrice: number;
    onClick: () => void;
}

function CartSummary({ totalItems, totalPrice, onClick }: CartSummaryProps) {
    return (
        <button
            onClick={onClick}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
            <ShoppingCart size={20} />
            <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
            <span>${totalPrice.toFixed(2)}</span>
        </button>
    );
}

interface CartDetailsProps {
    cart: CartItem[];
    updateCartItemQuantity: (productId: number, newQuantity: number) => void;
    removeFromCart: (productId: number) => void;
    totalPrice: number;
    onCheckout: () => void;
}

function CartDetails({
    cart,
    updateCartItemQuantity,
    removeFromCart,
    totalPrice,
    onCheckout
}: CartDetailsProps) {
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-xl z-10">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        {cart.map(item => (
                            <CartListItem
                                key={item.productId}
                                item={item}
                                updateQuantity={updateCartItemQuantity}
                                removeItem={removeFromCart}
                            />
                        ))}
                        <div className="mt-4 pt-4 border-t">
                            <strong>Total: ${totalPrice.toFixed(2)}</strong>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full"
                        >
                            Checkout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

interface CartItemProps {
    item: CartItem;
    updateQuantity: (productId: number, newQuantity: number) => void;
    removeItem: (productId: number) => void;
}

function CartListItem({ item, updateQuantity, removeItem }: CartItemProps) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
                <span className="font-semibold">{item.name}</span>
                <span className="text-sm text-gray-500">${item.unitPrice.toFixed(2)} each</span>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="text-gray-500 hover:text-gray-700"
                    disabled={item.quantity <= 1}
                >
                    <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <Plus size={16} />
                </button>
                <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:text-red-700 ml-2"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}