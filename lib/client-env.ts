import { z } from 'zod';

const clientEnvSchema = z.object({
    SITE_URL: z.url(),
    // todo populate with public environment variables
});

// Manually pass environment variables due to how Next.js injects them
export const clientEnv = clientEnvSchema.parse({
    SITE_URL: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
});
