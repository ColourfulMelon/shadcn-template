import 'server-only';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { serverEnv } from '@/lib/server-env.ts';
import fs from 'fs';

function getCertificate(): string {
    if (serverEnv.DB_CERT) return serverEnv.DB_CERT;
    if (serverEnv.DB_CERT_PATH) {
        return fs.readFileSync(serverEnv.DB_CERT_PATH, 'utf8');
    }
    throw new Error('No database certificate provided. Please set DB_CERT or DB_CERT_PATH in your environment variables.');
}


export const database = drizzle({
    connection: {
        connectionString: serverEnv.POSTGRES_URL,
        ssl: {
            ca: getCertificate(),
            rejectUnauthorized: false,
        },
    },
    schema: schema,
    casing: 'snake_case',
    
});