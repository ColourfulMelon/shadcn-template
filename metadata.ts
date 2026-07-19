import type { Viewport } from "next";
import { resolveSiteUrl } from "./site-url.mts";

type OpenGraphType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

interface SiteMetadata {
  /** Default page title, also used for og:title and twitter:title */
  title: string;
  description: string;
  /** og:type of the site */
  type: OpenGraphType;
  siteName: string;
  /** Canonical site URL, resolved from the environment below */
  url: string;
  /** Language tag for <html lang>, e.g. 'en' */
  lang: string;
  /** og:locale, e.g. 'en_US' */
  locale: string;
  author: string;
  authorUrl: string;
  /** X/Twitter handle including the '@' (twitter:site / twitter:creator); leave empty to omit */
  twitterHandle: string;
  themeColor: NonNullable<Viewport["themeColor"]>;
  /** Social share image; 1200x630 is the recommended size */
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  colorScheme: NonNullable<Viewport["colorScheme"]>;
}

// todo: update metadata
export const siteMetadata = {
  title: "Title",
  description: "Description",
  type: "website",
  siteName: "SiteName",
  url: resolveSiteUrl(),
  lang: "en",
  locale: "en_US",
  author: "Dev3.Studio",
  authorUrl: "https://dev3.studio",
  twitterHandle: "",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  image: {
    url: "https://placehold.co/1200x630",
    width: 1200,
    height: 630,
    alt: "Title",
  },
  colorScheme: "light dark",
} satisfies SiteMetadata;

if (process.env.NODE_ENV === "production" && process.env.ALLOW_PLACEHOLDER_METADATA !== "true") {
  const siteUrl = new URL(siteMetadata.url);
  const imageUrl = new URL(siteMetadata.image.url, `${siteMetadata.url}/`);
  const placeholderFields = [
    siteMetadata.title === "Title" ? "title" : null,
    siteMetadata.description === "Description" ? "description" : null,
    siteMetadata.siteName === "SiteName" ? "siteName" : null,
    ["localhost", "127.0.0.1", "[::1]"].includes(siteUrl.hostname) ? "url" : null,
    imageUrl.hostname === "placehold.co" ? "image.url" : null,
    siteMetadata.image.alt === "Title" ? "image.alt" : null,
  ].filter((field): field is string => field !== null);

  if (placeholderFields.length > 0) {
    throw new Error(
      `Production metadata is not configured: ${placeholderFields.join(", ")}. Update metadata.ts and SITE_URL before building.`,
    );
  }
}
