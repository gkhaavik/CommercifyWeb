import { CartItem } from '@/types'
interface CartProps {
    cart: CartItem[];
    removeFromCart: (productId: number) => void;
}

export default function Cart({ cart, removeFromCart }: CartProps) {
    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.productId} className="flex justify-between items-center mb-2">
                            <span>{item.name} (x{item.quantity})</span>
                            <div>
                                <span className="mr-2">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t">
                        <strong>Total: ${total.toFixed(2)}</strong>
                    </div>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full">
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
}