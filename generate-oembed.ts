import fs from 'fs';
import path from 'path';
import { SetMetadata } from './metadata.ts';

// Create the oembed data structure
const oembedData = {
    title: SetMetadata.title,
    author_name: SetMetadata.siteName,
    author_url: SetMetadata.url,
    provider_name: SetMetadata.author,
    provider_url: SetMetadata.author_url
};

// Ensure the public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Write the oembed.json file
const oembedPath = path.join(publicDir, 'oembed.json');
fs.writeFileSync(
    oembedPath,
    JSON.stringify(oembedData, null, 2),
    'utf8'
);

console.log(`oembed.json has been created successfully at ${oembedPath}`);