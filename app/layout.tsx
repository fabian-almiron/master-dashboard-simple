import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'

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
  
  // Only use ClerkProvider if publishableKey is available (runtime vs build time)
  const content = (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
  
  // Only skip ClerkProvider if we explicitly don't have keys
  // This allows build to succeed but runtime to work normally
  if (!clerkPublishableKey || clerkPublishableKey === '') {
    return content
  }
  
  // Render with ClerkProvider when keys are available
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {content}
    </ClerkProvider>
  )
}
