# Web security baseline

The template applies its security headers to every route from `next.config.mjs`.
They provide a safe default, but they do not replace application-specific threat
modeling, authorization, input validation, secure cookies, or dependency review.

## Enforced headers

- `Strict-Transport-Security: max-age=31536000` tells browsers to use HTTPS for one
  year. It only takes effect over HTTPS. Add `includeSubDomains` or `preload` only when
  every current and future subdomain can remain HTTPS-only.
- `X-Content-Type-Options: nosniff` disables MIME type guessing.
- `X-Frame-Options: DENY` blocks framing in browsers that do not enforce CSP
  `frame-ancestors`.
- `Referrer-Policy: strict-origin-when-cross-origin` avoids sending paths and query
  strings to other origins.
- `Permissions-Policy` disables camera, geolocation, microphone, and browsing topics.
- `X-XSS-Protection: 0` disables obsolete browser XSS filters that can introduce their
  own vulnerabilities.
- Next.js's `X-Powered-By` header is disabled.

## CSP starting point

The template sends `Content-Security-Policy-Report-Only`. This records violations in
browser developer tools without blocking resources. The starting policy:

- defaults resources to the same origin;
- blocks plugins, framing, and base URL injection;
- limits forms, fonts, media, manifests, and workers to known sources;
- permits the template's configured image hosts;
- permits Next.js inline scripts and styles; and
- permits `unsafe-eval` and WebSocket connections only during development.

Report-only CSP is detection, not protection. Before changing the header to
`Content-Security-Policy`:

1. Add a CSP reporting endpoint and monitor real traffic until expected violations are
   understood.
2. Add only the exact origins required by APIs, analytics, images, scripts, styles,
   frames, media, and workers. Avoid broad schemes and wildcards.
3. Decide whether the application must remain statically rendered. A strict nonce-based
   Next.js CSP requires per-request nonces and therefore dynamic rendering.
4. Replace `unsafe-inline` with nonces or hashes. Keep `unsafe-eval` development-only.
5. If the application must be embedded, relax both `frame-ancestors` and
   `X-Frame-Options` deliberately.
6. Test authentication redirects, payments, third-party widgets, uploads, and preview
   environments before enforcing the policy.

See the [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy),
the [Next.js headers reference](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers),
and the [OWASP CSP cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html).
