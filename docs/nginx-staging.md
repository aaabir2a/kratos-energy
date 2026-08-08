# Blocking `test.kratos-energy.com` from search

The app blocks non-production origins via `NEXT_PUBLIC_SITE_URL` (see
`src/app/robots.ts`), but that only helps if staging runs its own build. If the
`test.` vhost proxies the same container as production, the app cannot tell the
two hosts apart and nginx has to carry it.

Apply this to the `test.kratos-energy.com` server block:

```nginx
server {
    server_name test.kratos-energy.com;

    # Removes already-indexed staging URLs. Disallow alone does not — it stops
    # the crawl, which stops Google ever seeing a noindex, so blocked-but-indexed
    # URLs persist indefinitely.
    add_header X-Robots-Tag "noindex, nofollow" always;

    location = /robots.txt {
        add_header Content-Type text/plain;
        return 200 "User-agent: *\nDisallow: /\n";
    }

    # ... existing proxy_pass to 127.0.0.1:3006 ...
}
```

Then:

```bash
nginx -t && systemctl reload nginx
```

Verify:

```bash
curl -sI https://test.kratos-energy.com/ | grep -i x-robots-tag
```

```bash
curl -s https://test.kratos-energy.com/robots.txt
```

Expect `X-Robots-Tag: noindex, nofollow` and `Disallow: /`.

If any `test.` URLs are already indexed, file a removal request in Search
Console once the header is live. Deleting the DNS record and the nginx symlink
altogether is strictly better than blocking, if the subdomain isn't needed.
