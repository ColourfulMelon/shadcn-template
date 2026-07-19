import type { MetadataRoute } from "next";

import { clientEnv } from "@/lib/client-env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", clientEnv.NEXT_PUBLIC_SITE_URL).toString(),
  };
}
