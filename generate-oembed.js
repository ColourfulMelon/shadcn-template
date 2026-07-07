const fs = require('fs');
const path = require('path');

const { SetMetadata } = require('./metadata.ts');

// Create the oembed data structure (https://oembed.com — version and type are required)
const oembedData = {
    version: '1.0',
    type: 'link',
    title: SetMetadata.title,
    author_name: SetMetadata.author,
    author_url: SetMetadata.authorUrl,
    provider_name: SetMetadata.siteName,
    provider_url: SetMetadata.url,
    thumbnail_url: SetMetadata.image.url,
    thumbnail_width: SetMetadata.image.width,
    thumbnail_height: SetMetadata.image.height,
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

console.log(`oembed.json has been created at ${oembedPath}`);