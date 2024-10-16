import { AuthProvider } from '@/context/AuthContext'
import '../globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Commercify Demo Store',
  description: 'A simple e-commerce store built on top of Commercify.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}