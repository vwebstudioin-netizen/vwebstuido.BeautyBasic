import type { Metadata } from 'next'
import { Cormorant_Garamond, Lato } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Glamour Touch Parlour | Beauty & Wellness Services',
  description:
    'Premium beauty parlour offering manicure, pedicure, facials, waxing, hair styling, and exclusive bridal packages. Book your appointment today.',
  keywords: [
    'beauty parlour',
    'salon',
    'manicure',
    'pedicure',
    'facial',
    'waxing',
    'bridal makeup',
    'hair styling',
    'beauty services',
  ],
  openGraph: {
    title: 'Glamour Touch Parlour | Beauty & Wellness Services',
    description:
      'Premium beauty parlour offering manicure, pedicure, facials, waxing, hair styling, and exclusive bridal packages.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  )
}
