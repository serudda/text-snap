import { prisma, type SubscriptionPlanSlug } from '@acme/db';
import { createUserSubscriptionHandler, getUserSubscriptionPlanHandler } from './utils/api';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type DefaultSession, type NextAuthOptions } from 'next-auth';
import TwitterProvider, { type TwitterLegacyProfile } from 'next-auth/providers/twitter';

/**
 * Module augmentation for `next-auth` types Allows us to
 * add custom properties to the `session` object and keep
 * type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      subscriptionPlan: SubscriptionPlanSlug | null;

      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
  }
}

interface TwitterProfile extends TwitterLegacyProfile {
  email: string;
}

/**
 * Options for NextAuth.js used to configure adapters,
 * providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: '',
      clientSecret: '',
      profile: (profile: TwitterProfile) => {
        return {
          id: profile.id_str, // NOTE: A cuid is being autogenerated, this id_str is not being saved.
          name: profile.name,
          username: profile.screen_name,
          email: profile.email,
          image: profile.profile_image_url.replace('_normal', ''),
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the
     * Discord provider. For example, the GitHub provider
     * requires you to add the `refresh_token_expires_in`
     * field to the Account model. Refer to the NextAuth.js
     * docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.username = user.username;
        session.user.email = user.email;
        session.user.image = user.image;
        // session.user.role = user.role; <-- put other properties on the session here

        // get the user's subscription
        const subscriptionPlan = await getUserSubscriptionPlanHandler(user.id);
        session.user.subscriptionPlan = subscriptionPlan || null;
      }
      return session;
    },
  },

  /**
   * Events allow Next-Auth to do some custom action after
   * certain user actions like creating a new account or
   * signing in, without blocking the auth flow. Read more
   * about the event system. Next-Auth will call this
   * function after a new user account is registered.
   *
   * @see https://dev.to/ajones_codes/how-to-add-user-accounts-and-paid-subscriptions-to-your-nextjs-website-585e
   * @see https://next-auth.js.org/configuration/events
   */
  events: {
    createUser: async ({ user }) => {
      // Connect user with the subscription free plan
      await createUserSubscriptionHandler(user);
    },
  },
};
