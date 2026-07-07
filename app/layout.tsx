import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/sonner";
import type { Viewport } from 'next'
import { SetMetadata } from '@/metadata';
const inter = Inter({ subsets: ['latin'] });


/*##################################################################
 * Do not change metadata below, change it in the metadata.ts file *
 *#################################################################*/
export const metadata: Metadata = {
    metadataBase: new URL(SetMetadata.url),
    title: {
        default: SetMetadata.title,
        template: `%s | ${SetMetadata.siteName}`,
    },
    description: SetMetadata.description,
    applicationName: SetMetadata.siteName,
    creator: SetMetadata.author,
    authors: [{ name: SetMetadata.author, url: SetMetadata.authorUrl }],
    openGraph: {
        title: SetMetadata.title,
        description: SetMetadata.description,
        type: SetMetadata.type,
        siteName: SetMetadata.siteName,
        url: SetMetadata.url,
        locale: SetMetadata.locale,
        images: [SetMetadata.image],
    },
    twitter: {
        card: 'summary_large_image',
        title: SetMetadata.title,
        description: SetMetadata.description,
        images: [SetMetadata.image],
        ...(SetMetadata.twitterHandle && {
            site: SetMetadata.twitterHandle,
            creator: SetMetadata.twitterHandle,
        }),
    },
    // oembed link workaround
    icons: {
        other: {
            rel: 'alternate',
            url: `${SetMetadata.url}/oembed.json`,
            type: 'application/json+oembed',
        },
    }
};

export const viewport: Viewport = {
    themeColor: SetMetadata.themeColor,
    colorScheme: SetMetadata.colorScheme,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <html suppressHydrationWarning lang={SetMetadata.lang}>
            <body className={`${inter.className} antialiased h-dvh`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/*header, page, footer*/}
                    <div className="h-full grid grid-rows-[auto_1fr_auto] min-h-screen">
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
