"use client";

import OrderConfirmation from '@/components/Client/OrderConfirmation';
import { useSearchParams } from 'next/navigation';

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    if (!orderId || typeof orderId !== 'string') {
        return <div>Invalid order ID</div>;
    }

    return <OrderConfirmation orderId={orderId} />;
}