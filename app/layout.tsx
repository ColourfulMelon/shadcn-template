import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import { AppleWebApp, AppLinks, Facebook, FormatDetection, ItunesApp } from 'next/dist/lib/metadata/types/extra-types';
import { Author, ReferrerEnum, Verification } from 'next/dist/lib/metadata/types/metadata-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

const inter = Inter({ subsets: ['latin'] });


const openGraph: OpenGraph = {
    title: 'OpenGraphTitle',
    description: 'OpenGraphDescription',
    type: 'article',
    authors: 'OpenGraphAuthors',
    siteName: 'OpenGraphSiteName',
    
}
// todo: update metadata
export const metadata: Metadata = {
    title: 'title',
    description: 'description',
    creator: 'creator',
    applicationName: 'applicationName',
    abstract: 'abstract',
    alternates: 'alternates' as AlternateURLs,
    assets: 'assets',
    authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
    archives: 'archives',
    bookmarks: 'bookmarks',
    category: 'category',
    // metadataBase: {}
    // facebook: {}
    icons: 'icons',
    // itunes: {}
    classification: 'classification',
    generator: 'generator',
    keywords: 'keywords',
    manifest: 'manifest',
    publisher: 'publisher',
    robots: 'robots',
    openGraph: openGraph,
    twitter: {
        site: 'twitterSite',
        title: 'twitterTitle',
        description: 'twitterDescription',
        creator: 'twitterCreator',
        creatorId: 'twitterCreatorId',
        siteId: 'twitterSiteId',
        images: ["https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"],
        app: {
            name: 'twitter_app',
            id: {
                iphone: 'twitter_app://iphone',
                ipad: 'twitter_app://ipad',
                googleplay: 'twitter_app://googleplay',
            },
            url: {
                iphone: 'https://iphone_url/',
                ipad: 'https://ipad_url/',
            },
        },
        
    },
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <>
        <meta name="twitter:data1" content="twitter data 1"/>
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
    </>
    
)
    ;
}
