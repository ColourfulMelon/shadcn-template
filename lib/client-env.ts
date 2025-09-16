import { z } from 'zod';

const clientEnvSchema = z.object({
    SITE_URL: z.url().default('http://localhost:3000'),
    REOWN_PROJECT_ID: z.string().optional().default("b56e18d47c72ab683b10814fe9495694"), // this is a public projectId only to use on localhost
    // todo populate with public environment variables
    
});

// Manually pass environment variables due to how Next.js injects them
export const clientEnv = clientEnvSchema.parse({
    SITE_URL: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    REOWN_PROJECT_ID: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
});
