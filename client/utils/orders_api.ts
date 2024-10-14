import { Order } from "@/types";

const apiUri = process.env.NEXT_PUBLIC_ORDERS_API_URL;

type CreateOrderRequest = {
    userId: string;
    orderLines: OrderLineRequest[];
}

type OrderLineRequest = {
    productId: string;
    quantity: number;
}

export const getUserOrders = async (userId: string): Promise<Order[]> => {
    const response = await fetch(`${apiUri}/api/v1/orders/user/${userId}`)
        .then((res) => res.json())
        .catch((err) => console.error("api:", err));
    return response;
};

export const getAllOrders = async () => {
    const response = await fetch(`${apiUri}/api/v1/orders`)
        .then((res) => res.json())
        .catch((err) => console.error("api:", err));
    return response;
};

export const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
    const response = await fetch(`${apiUri}/api/v1/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    const createdOrder = await response.json();

    return createdOrder;
};
