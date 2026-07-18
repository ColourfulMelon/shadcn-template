import { siteMetadata } from "@/metadata";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    version: "1.0",
    type: "link",
    title: siteMetadata.title,
    author_name: siteMetadata.author,
    author_url: siteMetadata.authorUrl,
    provider_name: siteMetadata.siteName,
    provider_url: siteMetadata.url,
    thumbnail_url: new URL(siteMetadata.image.url, `${siteMetadata.url}/`).toString(),
    thumbnail_width: siteMetadata.image.width,
    thumbnail_height: siteMetadata.image.height,
  });
}
