import 'server-only';
import { z } from 'zod';

const serverEnvSchema = z.object({
//     todo populate with server environment variables
});

export const serverEnv = serverEnvSchema.parse(process.env);