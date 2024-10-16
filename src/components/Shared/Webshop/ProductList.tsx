import { Product } from '@/types'

interface ProductListProps {
    products: Product[];
    addToCart: (product: Product) => void;
}

export default function ProductList({ products, addToCart }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <div key={product.productId} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-lg font-bold mb-4">${product.unitPrice.toFixed(2)}</p>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}