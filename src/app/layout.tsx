import type { Metadata } from 'next'
import { Roboto, Arimo, Exo_2 } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

const arimo = Arimo({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-arimo',
  display: 'swap',
})

const exo = Exo_2({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-exo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ToolIt - Premium Outdoor Adventure Gear',
  description: 'Experience outdoor adventure with our premium quality gear. Bikes, helmets, camping equipment and more.',
  keywords: 'outdoor gear, adventure equipment, bikes, helmets, camping, hiking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${arimo.variable} ${exo.variable}`}>
      <body className="bg-white text-gray-900">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
