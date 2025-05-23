import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_ISSUER_BASE_URL!.replace('https://', ''),
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  secret: process.env.AUTH0_SECRET!,
  appBaseUrl: process.env.AUTH0_BASE_URL!, // Ruta base
  routes: {    
    callback: '/api/auth/callback', // Redirección que se usará al volver de Auth0
  },
  // authorizationParams: {
  //   scope: process.env.AUTH0_SCOPE || 'openid profile email',
  //   audience: process.env.AUTH0_AUDIENCE || '',
  // },
});


