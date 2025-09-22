import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

// Debug NextAuth configuration
console.log('🔐 NextAuth Configuration:')
console.log(`   NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || 'MISSING'}`)
console.log(`   NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING'}`)
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`   GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? 'SET' : 'MISSING'}`)
console.log(`   GITHUB_ID: ${process.env.GITHUB_ID ? 'SET' : 'MISSING'}`)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === "production",
  debug: true, // Enable debug in production for troubleshooting
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔐 SignIn callback triggered:', {
        user: user?.email,
        account: account?.provider,
        profile: profile?.email
      })
      
      // Add email whitelist for security
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || []
      console.log('🔐 Allowed emails:', allowedEmails)
      
      if (allowedEmails.length > 0 && user.email) {
        const isAllowed = allowedEmails.includes(user.email)
        console.log(`🔐 Email ${user.email} allowed:`, isAllowed)
        return isAllowed
      }
      
      console.log('🔐 No email restrictions, allowing sign in')
      return true
    },
    async session({ session, token }) {
      return session
    },
    async jwt({ token, user }) {
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
