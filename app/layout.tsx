import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import Link from 'next/link';
import type { Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] });


// todo: update metadata
const openGraph: OpenGraph = {
    title: 'OpenGraphTitle',
    description: 'OpenGraphDescription',
    type: 'website',
    siteName: 'OpenGraphSiteName',
    url: 'https://aventus.io/',
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg'],
}

export const metadata: Metadata = {
    title: 'title',
    description: 'description',
    creator: 'creator',
    openGraph: openGraph,
    // oembed link workaround
    icons: {
        other: {
            rel: 'alternate',
            url: `${process.env.SITE_URL}/oembed.json`,
            type: 'application/json+oembed',
        }
    }
};
// todo: update theme colour
export const viewport: Viewport = {
    themeColor: '#00FF00',
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
    
    )
        ;
}
