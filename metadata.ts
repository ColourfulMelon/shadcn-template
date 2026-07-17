import dotenv from "dotenv";

dotenv.config();

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

type ColorScheme = "normal" | "light" | "dark" | "light dark" | "dark light" | "only light";

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
  themeColor: string;
  /** Social share image; 1200x630 is the recommended size */
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  colorScheme: ColorScheme;
}

// Canonical site URL: explicit SITE_URL wins, then the Vercel production
// domain, then localhost for local development.
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// todo: update metadata
export const SetMetadata = {
  title: "Title",
  description: "Description",
  type: "website",
  siteName: "SiteName",
  url: siteUrl,
  lang: "en",
  locale: "en_US",
  author: "Dev3.Studio",
  authorUrl: "https://dev3.studio",
  twitterHandle: "",
  themeColor: "#00FF00",
  image: {
    url: "https://placehold.co/1200x630",
    width: 1200,
    height: 630,
    alt: "Title",
  },
  colorScheme: "dark",
} satisfies SiteMetadata;
