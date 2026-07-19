const LOCAL_SITE_URL = "http://localhost:3000";

export function resolveSiteUrl(env: NodeJS.ProcessEnv = process.env) {
  const source = env.SITE_URL !== undefined ? "SITE_URL" : "VERCEL_PROJECT_PRODUCTION_URL";
  const rawSiteUrl =
    env.SITE_URL ??
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? /^https?:\/\//i.test(env.VERCEL_PROJECT_PRODUCTION_URL)
        ? env.VERCEL_PROJECT_PRODUCTION_URL
        : `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : LOCAL_SITE_URL);

  let siteUrl: URL;

  try {
    siteUrl = new URL(rawSiteUrl.trim());
  } catch (error) {
    throw new Error(`${source} must be a valid absolute URL; received "${rawSiteUrl}".`, {
      cause: error,
    });
  }

  if (!["http:", "https:"].includes(siteUrl.protocol)) {
    throw new Error(`${source} must use http or https; received "${rawSiteUrl}".`);
  }

  if (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
    throw new Error(
      `${source} must not include a path, query string, or hash; received "${rawSiteUrl}".`,
    );
  }

  return siteUrl.toString().replace(/\/+$/, "");
}
