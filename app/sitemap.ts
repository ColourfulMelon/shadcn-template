import type { MetadataRoute } from "next";

import { productionUrl } from "@/lib/client-env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", productionUrl).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
