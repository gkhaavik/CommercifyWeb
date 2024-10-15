import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { fetchOrderDetails } from '@/lib/ordersApi';
import { OrderDetails } from '@/types';

type OrderConfirmationProps = {
    orderId: string;
};

export default function OrderConfirmationPage({ orderId }: OrderConfirmationProps) {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const { clearCart } = useCart();

    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId && typeof orderId === 'string') {
                try {
                    const details = await fetchOrderDetails(parseInt(orderId, 10));
                    setOrderDetails(details);
                    clearCart();
                } catch (err) {
                    console.error('Failed to fetch order details:', err);
                    setError('Failed to load order details. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setError('Invalid order ID');
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (isLoading) {
        return <div className="text-center py-8">Loading order details...</div>;
    }

    if (error || !orderDetails) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <AlertCircle className="inline-block text-red-500 w-16 h-16 mb-4" />
                <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
                <p className="text-xl text-gray-600 mb-4">{error}</p>
                <Link href="/" className="text-blue-500 hover:underline">
                    Return to Home Page
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <CheckCircle className="inline-block text-green-500 w-16 h-16 mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                    <p className="text-xl text-gray-600">Thank you for your purchase.</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                    <p className="mb-2"><strong>Order ID:</strong> {orderDetails.orderId ?? -1}</p>
                    <p className="mb-4"><strong>Total Amount:</strong> ${orderDetails.totalAmount ?? -1}</p>

                    <h3 className="text-xl font-semibold mb-2">Items</h3>
                    <ul className="list-disc list-inside mb-4">
                        {orderDetails.orderLines.map((item, index) => (
                            <li key={index}>
                                {item.product?.name ?? "nilname"} Quantity: {item.quantity} - ${item.unitPrice} each
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center">
                    <p className="mb-4">
                        We&apos;ve sent a confirmation email to {user?.email}.
                        Please check your inbox for more details about your order.
                    </p>
                    <Link href="/" className="text-blue-500 hover:underline">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}