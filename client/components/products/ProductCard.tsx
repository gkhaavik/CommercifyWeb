import { useCart } from '@/app/context/CartContext';
import { Product } from '@/types'
import React from 'react'

type ProductCardProps = {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">${product.unitPrice.toFixed(2)}</span>
                <span className={`px-2 py-1 rounded text-sm font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
            </div>

            <button
                className={`w-full py-2 px-4 rounded text-white font-semibold ${product.stock > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
            >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    );
};

export default ProductCard