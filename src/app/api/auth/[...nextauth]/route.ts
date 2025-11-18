// handles logins, sessions, cookies
import NextAuth from "next-auth"
// type of login-method (username/password, Google, ...)
import CredentialsProvider from "next-auth/providers/credentials"
// bridge b/w NextAuth + database
import { PrismaAdapter } from "@auth/prisma-adapter"
// PrismaClient lets you interact with the data list
import { prisma } from "@/lib/prisma"
// turns passwords into hash
import bcrypt from "bcrypt"

// handler responds to API function call (api/auth/*)
const handler = NextAuth({
    // store users, sessions, accounts inside prisma database
    adapter: PrismaAdapter(prisma),
    // providers like Google, Github, etc
    providers: [
        CredentialsProvider({
            // defines what fields login-form will send
            name: "credentials",
            credentials: { email: {}, password: {} },
            // handles submission of login-form
            async authorize(credentials) {
                // validate input
                if (!credentials?.email || !credentials.password) return null
                // find user in database
                const user = await prisma.user.findUnique({ where: {email: credentials?.email } })
                    // user doesn't exist or user exists but didn't create a password
                    if(!user || !user.password) return null
                    // checks if password is correct
                    const isValid = await bcrypt.compare(credentials.password, user?.password)
                    if(!isValid) return null
                    return user
            }
        })
    ],
    // session stored in database
    session: {strategy: "database"}
})

export {handler as GET, handler as POST}