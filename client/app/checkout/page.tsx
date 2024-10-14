"use client";
import { useCart } from '@/app/context/CartContext';
import { createOrder } from '@/utils/orders_api';
import { makePayment } from '@/utils/payments_api';

export default function CheckoutPage() {
    const { cart, removeFromCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    async function handleCheckout() {
        const orderLines = cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
        }));

        console.log("Orderlines:", orderLines);

        const createdOrder = await createOrder({ userId: '1', orderLines }).then((res) => {
            console.log("Order created:", res);
            return res;
        });

        const response = await makePayment({
            orderId: createdOrder.orderId,
            currency: "USD"
        });

        console.log(response);
        window.location.href = response.redirectUrl;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.productId} className="mb-4">
                            <div className="flex justify-between">
                                <div>
                                    <p>{item.name} (x{item.quantity})</p>
                                    <p>${item.unitPrice * item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4">
                <h2>Total: ${total.toFixed(2)}</h2>
                <button className="bg-green-500 text-white py-2 px-4 rounded mt-2" onClick={handleCheckout}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
