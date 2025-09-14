import { createAuthClient } from 'better-auth/react';
import { admin } from 'better-auth/plugins';

export const authClient = createAuthClient({
    plugins: [
        admin(),
    ],
});

export type Session = typeof authClient.$Infer.Session;