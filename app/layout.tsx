import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientClerkProvider } from '@/components/client-clerk-provider'

export const metadata: Metadata = {
  title: 'Altira - CMS Management Platform',
  description: 'Deploy and manage multiple CMS instances from one powerful dashboard with Altira',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Allow build to succeed even without Clerk keys (they'll be required at runtime)
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <ClientClerkProvider publishableKey={clerkPublishableKey || ''}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClientClerkProvider>
      </body>
    </html>
  )
}
