import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeCSSLoader } from '@/components/theme-css-loader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CMS TailWinds',
  description: 'Multi-tenant CMS with theme support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeCSSLoader />
        {children}
      </body>
    </html>
  )
}
