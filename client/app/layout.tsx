import "./globals.css";
import Link from "next/link";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: 'Commercify',
  description: 'Your one-stop shop for everything!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <header className="bg-gray-900 text-white p-4">
            <nav className="container mx-auto flex justify-between">
              <Link href="/" className="text-xl font-bold">
                Commercify
              </Link>
              <div className="space-x-4">
                <Link href="/products" className="hover:underline">
                  Products
                </Link>
                <Link href="/orders" className="hover:underline">
                  Orders
                </Link>
                <Link href="/checkout" className="hover:underline">
                  Checkout
                </Link>
              </div>
            </nav>
          </header>
          <main className="container mx-auto p-4">{children}</main>
          <footer className="bg-gray-900 text-white p-4 mt-8 text-center">
            © {new Date().getFullYear()} Commercify. All rights reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
