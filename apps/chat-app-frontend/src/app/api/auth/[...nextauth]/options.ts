import { signin } from '@/app/auth/auth-service';
import { SigninPayload } from '@/app/auth/signin/_model';
import { CallbacksOptions, NextAuthOptions, User } from 'next-auth';
import { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';

const providers: Provider[] = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'ali@example.com' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const { data } = await signin(credentials as SigninPayload);

      if (data) {
        return { ...data.user, accessToken: data.accessToken };
      }

      return null;
    },
  }),
];

const callbacks: Partial<CallbacksOptions> = {
  async jwt({ token, user }) {
    if (user) {
      const newUser = { ...user } as any;

      token.accessToken = newUser.accessToken;
      token.id = newUser.id;
      token.firstName = newUser.firstName;
      token.lastName = newUser.lastName;
      token.username = newUser.username;
    }

    return token;
  },
  async session({ token, session }) {
    const newToken = { ...token } as any;
    const { id, firstName, lastName, username } = newToken;

    // @ts-ignore
    session.accessToken = token.accessToken;

    // @ts-ignore
    session.user = { id, firstName, lastName, username };
    
    return session;
  },
};

export const options: NextAuthOptions = {
  providers,
  // session: {
  //   maxAge: 30 * 24 * 60 * 60,
  // },
  callbacks,
  pages: {
    signIn: '/auth/signin',
  },
};
