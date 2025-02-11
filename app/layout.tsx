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
    siteName: 'OpenGraphSiteName',
    url: 'https://aventus.io/',
    authors: ['OpenGraphAuthors'],
    
    // publishedTime: '2025-01-28T13:28:27+00:00',
    // modifiedTime: '2025-01-28T13:28:27+00:00',
    // ttl: 20,
    // audio: [{
    //     url: 'OpenGraphAudioURL',
    //     secureUrl: 'OpenGraphAudioSecureURL',
    //     href: 'OpenGraphAudioHref',
    //     host: 'OpenGraphAudioHost',
    //
    // }],
    //
    // emails: ['OpenGraphEmails'],
    // countryName: 'OpenGraphCountryName',
    // tags: ['OpenGraphTags'],
    // phoneNumbers: ['OpenGraphPhoneNumbers'],
    // locale: 'OpenGraphLocale',
    // expirationTime: '2025-01-28T13:28:27+00:00',
    // section: 'OpenGraphSection',
    // faxNumbers: ['OpenGraphFaxNumbers'],
    // determiner: 'the',
    // alternateLocale: 'OpenGraphAlternateLocale',
    
    
    
    // videos: [{
    //     url: 'OpenGraphVideoURL',
    //     secureUrl: 'OpenGraphVideoSecureURL',
    // }],
    // authors: ['OpenGraphAuthors'],
    // images: [{  url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg', width: 1200, height: 630, alt: 'OpenGraphImageAlt',
    // secureUrl: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
    // type: 'image/jpeg'
    //
    // }],
    
    
    
}

// todo: update metadata
export const metadata: Metadata = {
    title: 'title',
    description: 'description',
    creator: 'creator',
    authors: [{ name: 'author', url: 'https://google.com' }],
    // applicationName: 'applicationName',
    // abstract: 'abstract',
    // alternates: 'alternates' as AlternateURLs,
    // assets: 'assets',
    // authors: [{ name: 'Author', url: 'https://authorurl' }],
    // archives: 'archives',
    // bookmarks: 'bookmarks',
    // category: 'category',
    // // metadataBase: {}
    // // facebook: {}
    // icons: 'icons',
    // // itunes: {}
    // classification: 'classification',
    // generator: 'generator',
    // keywords: 'keywords',
    // manifest: 'manifest',
    // publisher: 'publisher',
    // robots: 'robots',
    openGraph: openGraph,
    // twitter: {
    //     site: 'twitterSite',
    //     title: 'twitterTitle',
    //     description: 'twitterDescription',
    //     creator: 'twitterCreator',
    //     creatorId: 'twitterCreatorId',
    //     siteId: 'twitterSiteId',
    //     images: ["https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"],
    //     app: {
    //         name: 'twitter_app',
    //         id: {
    //             iphone: 'twitter_app://iphone',
    //             ipad: 'twitter_app://ipad',
    //             googleplay: 'twitter_app://googleplay',
    //         },
    //         url: {
    //             iphone: 'https://iphone_url/',
    //             ipad: 'https://ipad_url/',
    //         },
    //     },
    //
    // },
    // formatDetection: {
    //     email: false,
    //     address: false,
    //     telephone: false,
    // },
};



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    
    const jsonLD = {"@context":"https://schema.org","@graph":[{"@type":["Person","Organization"],"@id":"https://aventus.io/#person","name":"Aventus","logo":{"@type":"ImageObject","@id":"https://aventus.io/#logo","url":"https://aventus.io/wp-content/uploads/2024/10/Aventus-Logo.svg","contentUrl":"https://aventus.io/wp-content/uploads/2024/10/Aventus-Logo.svg","caption":"Aventus","inLanguage":"en-GB"},"image":{"@type":"ImageObject","@id":"https://aventus.io/#logo","url":"https://aventus.io/wp-content/uploads/2024/10/Aventus-Logo.svg","contentUrl":"https://aventus.io/wp-content/uploads/2024/10/Aventus-Logo.svg","caption":"Aventus","inLanguage":"en-GB"}},{"@type":"WebSite","@id":"https://aventus.io/#website","url":"https://aventus.io","name":"Aventus","publisher":{"@id":"https://aventus.io/#person"},"inLanguage":"en-GB","potentialAction":{"@type":"SearchAction","target":"https://aventus.io/?s={search_term_string}","query-input":"required name=search_term_string"}},{"@type":"ImageObject","@id":"https://aventus.io/wp-content/uploads/2025/01/1-updated-with-white-bg.png","url":"https://aventus.io/wp-content/uploads/2025/01/1-updated-with-white-bg.png","width":"1920","height":"892","inLanguage":"en-GB"},{"@type":"WebPage","@id":"https://aventus.io/#webpage","url":"https://aventus.io/","name":"Aventus | Enterprise Blockchain-as-a-Service Solutions","datePublished":"2024-10-30T12:34:27+00:00","dateModified":"2025-01-28T13:28:27+00:00","about":{"@id":"https://aventus.io/#person"},"isPartOf":{"@id":"https://aventus.io/#website"},"primaryImageOfPage":{"@id":"https://aventus.io/wp-content/uploads/2025/01/1-updated-with-white-bg.png"},"inLanguage":"en-GB"},{"@type":"Person","@id":"https://aventus.io/author/396521c72263a9ca/","name":"500 Designs","url":"https://aventus.io/author/396521c72263a9ca/","image":{"@type":"ImageObject","@id":"https://secure.gravatar.com/avatar/7187f9812073ad5e55f95237c80ba5b5?s=96&amp;d=mm&amp;r=g","url":"https://secure.gravatar.com/avatar/7187f9812073ad5e55f95237c80ba5b5?s=96&amp;d=mm&amp;r=g","caption":"500 Designs","inLanguage":"en-GB"},"sameAs":["https://www.500designs.com"]},{"headline":"Aventus | Enterprise Blockchain-as-a-Service Solutions","description":"Blockchain, Digital Assets, and Tokenisation: Effortlessly Powerful. Enterprise-Grade.","datePublished":"2024-10-30T12:34:27+00:00","dateModified":"2025-01-28T13:28:27+00:00","keywords":"blockchain as a service,Enterprise blockchain solutions","image":{"@id":"https://aventus.io/wp-content/uploads/2025/01/1-updated-with-white-bg.png"},"author":{"@id":"https://aventus.io/author/396521c72263a9ca/","name":"500 Designs"},"@type":"Article","name":"Aventus | Enterprise Blockchain-as-a-Service Solutions","@id":"https://aventus.io/#schema-15419","isPartOf":{"@id":"https://aventus.io/#webpage"},"publisher":{"@id":"https://aventus.io/#person"},"inLanguage":"en-GB","mainEntityOfPage":{"@id":"https://aventus.io/#webpage"}},{"@type":"VideoObject","name":"Aventus | Enterprise Blockchain-as-a-Service Solutions","description":"Blockchain, Digital Assets, and Tokenisation: Effortlessly Powerful. Enterprise-Grade.","uploadDate":"2024-10-30T12:34:27+00:00","thumbnailUrl":"https://aventus.io/wp-content/uploads/2025/01/1-updated-with-white-bg.png","contentUrl":"https://aventuscdn.b-cdn.net/web/2024/animations/Hero%20Animation-High%20Quality.mp4","isFamilyFriendly":"True","@id":"https://aventus.io/#schema-15420","isPartOf":{"@id":"https://aventus.io/#webpage"},"publisher":{"@id":"https://aventus.io/#person"},"inLanguage":"en-GB","mainEntityOfPage":{"@id":"https://aventus.io/#webpage"}},{"@type":"WebSite","url":"https://aventus.io/","potentialAction":{"@type":"SearchAction","target":"https://aventus.io/?q={search_term_string}","query-input":"required name=search_term_string"},"video":{"@type":"VideoObject","name":"Aventus | Enterprise Blockchain-as-a-Service Solutions","description":"Blockchain, Digital Assets, and Tokenisation: Effortlessly Powerful. Enterprise-Grade.","thumbnailUrl":"https://aventus.io/thumbnail.jpg","uploadDate":"2024-10-30T12:34:27+00:00","duration":"PT2M30S","contentUrl":"https://aventuscdn.b-cdn.net/web/2024/animations/Hero%20Animation-High%20Quality.mp4"}}]}
    
    return (
        
        
        <>
            {/*<meta name="twitter:label1" content="Written by"/>*/}
            {/*<meta name="twitter:data1" content="twitterdata1"/>*/}
            {/*<meta name="twitter:label2" content="Time to read"/>*/}
            {/*<meta name="twitter:data2" content="1 minute"/>*/}
            {/*<meta name="article:author" content="article Author"/>*/}
            {/*<meta property="og:updated_time" content="2025-01-28T13:28:27+00:00"/>*/}
            
            <head>
            {/*    <meta property="og:title" content="Site Title"/>*/}
            {/*    <meta property="og:type" content="website"/>*/}
            {/*    <meta property="og:url" content="http://my.site.com"/>*/}
            {/*    <meta property="og:image"*/}
            {/*          content="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"/>*/}
            {/*    <meta property="og:description" content="Site description"/>*/}
            {/*    <meta name="theme-color" content="#FF0000"/>*/}
            {/*    */}
            {/*    <meta name="twitter:card" content="summary_large_image"/>*/}
            {/*    */}
                <script type="application/ld+json"
                        className="rank-math-schema-pro"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
                />
                <title>TItle</title>
            </head>
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
