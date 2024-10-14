// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Commercify!</h1>
      <p className="text-xl text-gray-700 mb-8">
        Your one-stop shop for everything.
      </p>
      <div className="flex space-x-6">
        <Link href="/products" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition">
          View Products
        </Link>
        <Link href="/orders" className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition">
          Your Orders
        </Link>
        <Link href="/checkout" className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition">
          Checkout
        </Link>
      </div>
    </div>
  );
}
