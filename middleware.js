import { next } from '@vercel/edge';

export const config = {
  // api, _next(Next.js固有だが念のため維持), assets, favicon などを除外
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};

export default function middleware(request) {
  const authorization = request.headers.get('authorization');

  if (authorization) {
    const [scheme, encoded] = authorization.split(' ');

    if (scheme === 'Basic' && encoded) {
      try {
        const [user, pwd] = atob(encoded).split(':');

        if (
          user === process.env.BASIC_AUTH_USER &&
          pwd === process.env.BASIC_AUTH_PASSWORD
        ) {
          return next();
        }
      } catch (e) {
        // デコードエラーなどは認証失敗とみなす
      }
    }
  }

  return new Response('Basic Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
