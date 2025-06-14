import { z } from 'zod';

const clientEnvSchema = z.object({
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    // todo populate with public environment variables
    
});

// Manually pass environment variables due to how Next.js injects them
export const clientEnv = clientEnvSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
