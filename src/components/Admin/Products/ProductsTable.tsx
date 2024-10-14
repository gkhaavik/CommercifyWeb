"use client";

import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import Pagination from "../../Shared/Table/Pagination";
import Table, { Column } from "../../Shared/Table/Table";
import TableContainer from "../../Shared/Table/TableContainer";

export default function ProductsTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts(currentPage).then((data) => {
            setProducts(data.products);
            setTotalPages(data.totalPages);
        });
    }, [currentPage]);

    const columns: Column<Product>[] = [
        { key: 'productId', header: 'ID' },
        { key: 'name', header: 'Name' },
        {
            key: 'unitPrice',
            header: 'Price',
            render: (row) => `${row.unitPrice} ${row.currency}`
        },
        { key: 'stock', header: 'Stock' },
        {
            key: 'active',
            header: 'Active',
            render: (row) => row.active ? 'Yes' : 'No'
        },
    ];

    return (
        <div className="p-4">
            <TableContainer title="Products">
                <Table columns={columns} data={products} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </TableContainer>
        </div >
    )
}