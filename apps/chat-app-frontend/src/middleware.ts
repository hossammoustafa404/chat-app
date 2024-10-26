import { withAuth } from 'next-auth/middleware';

const publicRoutes = ['/auth/signup'];

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const pathname = req.nextUrl.pathname;
      return publicRoutes.includes(pathname) || !!token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
