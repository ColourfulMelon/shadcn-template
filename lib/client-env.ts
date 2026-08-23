import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.hostname(),
  // todo populate with public environment variables
});

// Manually pass environment variables due to how Next.js injects them
export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
});

export const productionUrl = `https://${clientEnv.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
