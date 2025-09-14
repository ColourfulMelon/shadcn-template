import 'server-only';
import { cookies } from 'next/headers';
import type { Session } from '@/lib/client.ts';
import { clientEnv } from '@/lib/client-env.ts';
export async function getServerSession() {
    const cookieStore = await cookies();
    const authRes = await fetch(`${clientEnv.NEXT_PUBLIC_SITE_URL}/api/auth/get-session`, {
        headers: {
            Cookie: cookieStore.toString()
        },
        cache: 'default',
    });
    
    if (!authRes.ok) {
        return null;
    }
    const session: Session | null = await authRes.json();
    
    if (!session) {
        return null;
    }
    
    // type assertions
    return session;
}