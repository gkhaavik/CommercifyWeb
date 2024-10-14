import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types';

type Props = {
    products: Product[];
}

const ProductGrid = ({ products }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
            ))}
        </div>
    )
}

export default ProductGrid