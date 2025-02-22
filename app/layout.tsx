import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/sonner";
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import type { Viewport } from 'next'
import { SetMetadata } from '@/metadata';
import { ColorSchemeEnum } from 'next/dist/lib/metadata/types/metadata-types';
const inter = Inter({ subsets: ['latin'] });


/*##################################################################
 * Do not change metadata below, change it in the metadata.ts file *
 *#################################################################*/
const openGraph: OpenGraph = {
    title: SetMetadata.title,
    description: SetMetadata.description,
    // workaround as we cant use as const in metadata.ts
    type: SetMetadata.type as 'website',
    siteName: SetMetadata.siteName,
    url: SetMetadata.url,
    images: [SetMetadata.image],
}

export const metadata: Metadata = {
    title: SetMetadata.title,
    description: SetMetadata.description,
    creator: SetMetadata.author,
    openGraph: openGraph,
    // oembed link workaround
    icons: {
        other: {
            rel: 'alternate',
            url: `${process.env.SITE_URL}/oembed.json`,
            type: 'application/json+oembed',
        },
    }
};

export const viewport: Viewport = {
    themeColor: SetMetadata.themeColor,
    colorScheme: SetMetadata.colorScheme as ColorSchemeEnum,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased h-dvh`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/*header, page, footer*/}
                    <div className="h-full grid grid-rows-[auto,1fr,auto] min-h-screen">
                        <Header/>
                        {children}
                        <Footer/>
                    </div>
                    <Toaster/>
                </ThemeProvider>
            </body>
        </html>
    );
}
