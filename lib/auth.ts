import { admin } from 'better-auth/plugins';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { database } from '@/db';
import { nextCookies } from 'better-auth/next-js';
import { serverEnv } from '@/lib/server-env.ts';
import { Accounts, Sessions, Users, Verifications } from '@/db/schema.ts';

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    socialProviders: {
        google: {
            clientId: serverEnv.GOOGLE_CLIENT_ID!,
            clientSecret: serverEnv.GOOGLE_CLIENT_SECRET!,
        },
    },
    database: drizzleAdapter(database, {
            provider: 'pg',
            schema: {
                users: Users,
                accounts: Accounts,
                sessions: Sessions,
                verifications: Verifications,
            },
            // usePlural: true,
        }
    ),
    plugins: [
        admin(),
        nextCookies()
    ],
    user: { modelName: 'users' },
    session: { modelName: 'sessions' },
    account: { modelName: 'accounts' },
    verification: { modelName: 'verifications' },
    
});


