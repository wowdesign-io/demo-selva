import { NextRequest, NextResponse } from 'next/server';

// Basic auth password protection — controlled by env vars.
// BASIC_AUTH_PASS: required to enable protection (empty = disabled)
// BASIC_AUTH_USER: optional username override (default: "selva")
//
// To enable: set BASIC_AUTH_PASS in Vercel environment variables.
// To disable for public launch: remove or empty BASIC_AUTH_PASS.

export const config = {
  matcher: [
    // Protect all routes except Next.js internals, API routes, and static files
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};

export function proxy(req: NextRequest) {
  const pass = process.env.BASIC_AUTH_PASS;

  // Protection disabled when no password is set
  if (!pass) return NextResponse.next();

  // Allow Storyblok visual editor iframe (it passes _storyblok param)
  // and API routes used by the editor / webhooks
  const url = req.nextUrl;
  if (url.pathname.startsWith('/api/')) return NextResponse.next();

  const user = process.env.BASIC_AUTH_USER || 'selva';

  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Basic ')) {
    try {
      const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
      const colon   = decoded.indexOf(':');
      if (colon !== -1) {
        const u = decoded.slice(0, colon);
        const p = decoded.slice(colon + 1);
        if (u === user && p === pass) return NextResponse.next();
      }
    } catch {
      // malformed header — fall through to 401
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="SELVA Demo", charset="UTF-8"`,
    },
  });
}
