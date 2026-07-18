import type { MetadataRoute } from "next";

import { clientEnv } from "@/lib/client-env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", clientEnv.NEXT_PUBLIC_SITE_URL).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
