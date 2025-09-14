import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/get-server-session.ts';

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    
    if(!session) {
        redirect('/login')
    }
    
    return (
        <>
            {children}
        </>
    )
}