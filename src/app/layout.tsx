import './globals.css'
import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'
import { cn } from '@/lib/utils'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const exo2 = Exo_2({ 
  subsets: ['latin'],
  variable: '--font-exo2',
})

export const metadata: Metadata = {
  title: '4th Dimension',
  description: 'Experience the future of digital services across dimensions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={cn('dark', exo2.variable)}
      suppressHydrationWarning
    >
      <body 
        className="min-h-screen bg-metallic-black font-exo text-silver antialiased"
        suppressHydrationWarning
      >
        <Header />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}