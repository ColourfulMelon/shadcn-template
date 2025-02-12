import dotenv from 'dotenv';
dotenv.config();

// todo: update metadata
export const SetMetadata = {
    title: 'Title',
    description: 'Description',
    type: 'website',
    siteName: 'SiteName',
    url: process.env.SITE_URL,
    author: 'Dev3.Studio',
    author_url: 'https://dev3.studio',
    themeColor: '#00FF00',
    image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
} as const