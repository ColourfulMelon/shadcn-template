import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteMetadata } from "@/metadata";

const inter = Inter({ subsets: ["latin"] });
const oEmbedUrl = new URL("/oembed.json", siteMetadata.url);
oEmbedUrl.searchParams.set("url", siteMetadata.url);

/*##################################################################
 * Do not change metadata below, change it in the metadata.ts file *
 *#################################################################*/
export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.description,
  applicationName: siteMetadata.siteName,
  creator: siteMetadata.author,
  authors: [{ name: siteMetadata.author, url: siteMetadata.authorUrl }],
  alternates: {
    canonical: siteMetadata.url,
    types: {
      "application/json+oembed": oEmbedUrl,
    },
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    type: siteMetadata.type,
    siteName: siteMetadata.siteName,
    url: siteMetadata.url,
    locale: siteMetadata.locale,
    images: [siteMetadata.image],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
    ...(siteMetadata.twitterHandle && {
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
    }),
  },
};

export const viewport: Viewport = {
  themeColor: siteMetadata.themeColor,
  colorScheme: siteMetadata.colorScheme,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang={siteMetadata.lang}>
      <body className={`${inter.className} antialiased h-dvh`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/*header, page, footer*/}
          <div className="h-full grid grid-rows-[auto_1fr_auto] min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
