import dotenv from 'dotenv';
dotenv.config();

// Canonical site URL: explicit SITE_URL wins, then the Vercel production
// domain, then localhost for local development.
const siteUrl =
    process.env.SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000');

// todo: update metadata
export const SetMetadata = {
    title: 'Title',
    description: 'Description',
    // book, website, article, profile, video.episode, video.movie, video.other, video.tv_show, music.song, music.album, music.playlist
    type: 'website',
    siteName: 'SiteName',
    url: siteUrl,
    author: 'Dev3.Studio',
    author_url: 'https://dev3.studio',
    themeColor: '#00FF00',
    image: 'https://placehold.co/600x400',
    // light, dark, normal, only light, light dark, dark light
    colorScheme: 'dark',
};
