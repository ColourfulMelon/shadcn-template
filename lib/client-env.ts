import { z } from 'zod';

const clientEnvSchema = z.object({
    // todo populate with public environment variables
});

// Manually pass environment variables due to how Next.js injects them
export const env = clientEnvSchema.parse({
});
