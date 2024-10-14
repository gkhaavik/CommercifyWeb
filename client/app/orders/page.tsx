"use client";

import { useEffect, useState } from 'react';
import OrderCard from '@/components/orders/OrderCard';
import { Order } from '@/types';
import { getUserOrders } from '@/utils/orders_api';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const userId = '1';

    useEffect(() => {
        getUserOrders(userId)
            .then((data) => setOrders(data))
            .catch((error) => console.error(error));
    }, [userId]);

    if (!orders) return <div>Loading...</div>

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

            {orders.length === 0 && <p>No orders found.</p>}
            {orders.length > 0 && (
                <ul>
                    {orders.map((order) => (
                        <li key={order.orderId}>
                            <OrderCard order={order} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
