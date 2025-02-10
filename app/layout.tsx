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

// todo: update metadata
export const metadata: Metadata = {
    title: 'title',
    description: 'description',
    creator: 'creator',
    applicationName: 'applicationName',
    abstract: 'abstract',
    alternates: 'alternates' as AlternateURLs,
    assets: 'assets',
    authors: 'authors' as Author,
    archives: 'archives',
    bookmarks: 'bookmarks',
    category: 'category',
    metadataBase: 'metadataBase' as unknown as URL,
    facebook: 'facebook' as unknown as Facebook,
    icons: 'icons',
    itunes: 'itunes' as unknown as ItunesApp,
    classification: 'classification',
    generator: 'generator',
    keywords: 'keywords',
    manifest: 'manifest',
    publisher: 'publisher',
    robots: 'robots',
};

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
