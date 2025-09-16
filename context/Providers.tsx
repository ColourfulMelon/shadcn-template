"use client";
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner.tsx';
import ContextProvider from '.';
import { headers } from 'next/headers';

export const Providers = async ({children}: {children: React.ReactNode}) => {
    const headersData = await headers();
    const cookies = headersData.get('cookie');
    return(
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <ContextProvider cookies={cookies}>
            {children}
            </ContextProvider>
            <Toaster/>
        </ThemeProvider>
    )
}