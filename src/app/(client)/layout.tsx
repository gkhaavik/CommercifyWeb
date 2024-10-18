import Navbar from '@/components/Client/Navbar'
import '../globals.css'
import './styles.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local';

const specialEliteFont = localFont({ src: "../../public/fonts/SpecialElite-YOGj.ttf" });

export const metadata: Metadata = {
  title: 'HotelHunger',
  description: 'The official band merch store for HotelHunger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={`${specialEliteFont.className} min-h-screen bg-offwhite flex flex-col relative`}>
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="relative z-10">
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </main>
        </div>
      </body >
    </html >
  )
}