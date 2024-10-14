import Table, { Column } from '@/components/Shared/Table/Table';
import { OrderDetails, OrderLine } from '@/types';
import React from 'react';

interface OrderDetailsProps {
    order: OrderDetails;
    onClose: () => void;
}

export default function OrderDetailsOverview({ order, onClose }: OrderDetailsProps) {
    const orderLineColumns: Column<OrderLine>[] = [
        { key: 'productId', header: 'Product ID' },
        { key: 'quantity', header: 'Quantity' },
        { key: 'unitPrice', header: 'Unit Price' },
        {
            key: 'product',
            header: 'Product Name',
            render: (row) => row.product?.name
        },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <h3 className="font-semibold">Order Info</h3>
                        <p>Order ID: {order.orderId}</p>
                        <p>Status: {order.orderStatus}</p>
                        <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    {/* <div>
                        <h3 className="font-semibold">User Info</h3>
                        <p>User ID: {order.user.userId}</p>
                        <p>Name: {order.user.firstName} {order.user.lastName}</p>
                        <p>Email: {order.user.email}</p>
                    </div> */}
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Order Lines</h3>
                    <Table columns={orderLineColumns} data={order.orderLines} />
                </div>
                <button
                    onClick={onClose}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
}