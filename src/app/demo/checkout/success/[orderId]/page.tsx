"use client";

import OrderConfirmation from '@/components/Client/OrderConfirmation';

export default function CheckoutSuccessPage({ params }: { params: { orderId: string } }) {
    const { orderId } = params;
    
    if (!orderId || typeof orderId !== 'string') {
        return <div>Invalid order ID</div>;
    }

    return <OrderConfirmation orderId={orderId} />;
}