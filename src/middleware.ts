/**
 * This middleware is used to handle the language of the user.
 * It is used to redirect the user to the correct language.
 * It is also used to set the language of the user.
 * 
 * Also we don't use auth middleware here because it requires the [JWT Session Strategy](https://next-auth.js.org/configuration/nextjs#caveats).
 * Using database sessions is the recommended approach and you should read up on JWTs before switching to the JWT session strategy to avoid any security issues.
 */
import { middleware as intlMiddleware } from './lib/i18n';

export const config = {
    matcher: [
      '/(en|fr)/:path*',
      '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
};

export default intlMiddleware;
