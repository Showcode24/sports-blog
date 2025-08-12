import type { Metadata } from 'next'
import { Inter, EB_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700']
})

const ebGaramond = EB_Garamond({ 
  subsets: ['latin'],
  variable: '--font-garamond',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'SportsPulse - Your Ultimate Sports Destination',
  description: 'Get the latest sports news, match highlights, player profiles, and analysis across football, basketball, tennis, boxing, and athletics.',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ebGaramond.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
