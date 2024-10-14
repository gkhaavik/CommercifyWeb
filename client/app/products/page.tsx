"use client";

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { getProducts } from '@/utils/products_api';
import ProductGrid from '@/components/products/ProductGrid';


export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        getProducts()
            .then((res) => setProducts(res))
            .catch((err) => console.error("page:", err));
    }, []);

    if (!products) return <div>Loading...</div>

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <ProductGrid products={products} />
        </div>
    );
}
