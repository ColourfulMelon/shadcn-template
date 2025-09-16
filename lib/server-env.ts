import 'server-only';
import { z } from 'zod';

const serverEnvSchema = z.object({
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    POSTGRES_URL: z.string(),
    DB_CERT: z.string().optional(),
    DB_CERT_PATH: z.string().optional(),
    BETTER_AUTH_SECRET: z.string(),
});

export const serverEnv = serverEnvSchema.parse(process.env);