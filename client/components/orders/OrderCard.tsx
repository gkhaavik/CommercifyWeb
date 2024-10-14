import { Order } from '@/types'
import React from 'react'

type OrderCardProps = {
    order: Order
}

const OrderCard = ({ order }: OrderCardProps) => {
    // Calculate total price for the order
    const getTotalPrice = () => {
        return order.orderLines.reduce(
            (total, orderLine) => total + orderLine.quantity * orderLine.unitPrice,
            0
        ).toFixed(2);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Order #{order.orderId}</h2>

            <div className="mb-4">
                <p className="text-gray-600">User ID: <span className="text-black">{order.userId}</span></p>
                <p className="text-gray-600">Status:
                    <span className={`ml-2 px-2 py-1 rounded ${order.orderStatus === 'completed' ? 'bg-green-100 text-green-800' :
                            order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                </p>
                <p className="text-gray-600">Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-600">Updated At: {new Date(order.updatedAt).toLocaleDateString()}</p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Order Lines</h3>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">Product ID</th>
                        <th className="py-2 px-4 border-b text-center">Quantity</th>
                        <th className="py-2 px-4 border-b text-right">Unit Price</th>
                        <th className="py-2 px-4 border-b text-right">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.orderLines.map((orderLine) => (
                        <tr key={orderLine.orderlineId} className="border-b">
                            <td className="py-2 px-4 text-left">{orderLine.productId}</td>
                            <td className="py-2 px-4 text-center">{orderLine.quantity}</td>
                            <td className="py-2 px-4 text-right">${orderLine.unitPrice.toFixed(2)}</td>
                            <td className="py-2 px-4 text-right">${(orderLine.quantity * orderLine.unitPrice).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 text-right">
                <p className="text-lg font-semibold">Total: ${getTotalPrice()}</p>
            </div>
        </div>
    );
}

export default OrderCard