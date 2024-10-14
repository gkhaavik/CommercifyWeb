import { Order } from '@/types';
import React from 'react'

type Props = {
    order: Order;
}

const CheckoutConfirmation = ({ order }: Props) => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
            <p>Your order has been placed successfully. Order ID: {order.orderId}</p>
            <p>Order Status: {order.orderStatus}</p>
            <p>Order Date: {order.createdAt.toISOString()}</p>
            <p>Order Lines:</p>
            <ul>
                {order.orderLines.map((orderLine) => (
                    <li key={orderLine.orderlineId}>
                        {orderLine.quantity} x {orderLine.productId}
                    </li>
                ))}
            </ul>

            <p>
                We appreciate your business! If you have any questions, please email
                <a href="mailto:orders@example.com">orders@example.com</a>.
            </p>
        </div>
    )
}

export default CheckoutConfirmation