'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types'
import ProductList from '@/components/Shared/Webshop/ProductList'
import { fetchActiveProducts } from '@/lib/productsApi'
import CompactCart from '@/components/Shared/Webshop/CompactCart'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { cart, addToCart, removeFromCart, updateCartItemQuantity } = useCart();

  useEffect(() => {
    fetchActiveProducts(1).then(data => setProducts(data.products));
  }, []);

  const handleCheckout = () => {
    router.push('/demo/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to Our Store</h1>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <span>Welcome, {user?.firstName}</span>
          ) : (
            <button
              onClick={() => router.push('/demo/login')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          )}
          <CompactCart
            cart={cart}
            updateCartItemQuantity={updateCartItemQuantity}
            removeFromCart={removeFromCart}
            onCheckout={handleCheckout}
          />
        </div>
      </header>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
}