"use client";

import { fetchOrders, fetchOrderDetails } from "@/lib/api";
import { Order, OrderDetails } from "@/types";
import { useState, useEffect } from "react";
import Pagination from "../shared/Table/Pagination";
import Table, { Column } from "../shared/Table/Table";
import TableContainer from "../shared/Table/TableContainer";
import OrderDetailsOverview from "../OrderDetailsOverview";

export default function OrdersTable() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchOrders(currentPage).then((data) => {            
            setOrders(data.orders);
            setTotalPages(data.totalPages);
        });
    }, [currentPage]);

    const handleOrderClick = async (orderId: number) => {
        const orderDetails = await fetchOrderDetails(orderId);
        setSelectedOrder(orderDetails);
    };

    const columns: Column<Order>[] = [
        { key: 'orderId', header: 'ID' },
        { key: 'userId', header: 'User ID' },
        { key: 'orderStatus', header: 'Status' },
        {
            key: 'createdAt',
            header: 'Created At',
            render: (row) => new Date(row.createdAt).toLocaleDateString()
        },
        {
            key: 'action',
            header: 'Actions',
            render: (row) => (
                <button
                    onClick={() => handleOrderClick(row.orderId)}
                    className="bg-orange-500 text-white px-2 py-1 rounded text-sm hover:bg-orange-600"
                >
                    View Details
                </button>
            )
        }
    ];

    return (
        <div className="p-4">
            <TableContainer title="Orders">
                <Table columns={columns} data={orders} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </TableContainer>
            {selectedOrder && (
                <OrderDetailsOverview
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    )
}