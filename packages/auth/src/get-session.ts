import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth-options';
import { getServerSession as $getServerSession } from 'next-auth';

type GetServerSessionContext =
  | {
      req: GetServerSidePropsContext['req'];
      res: GetServerSidePropsContext['res'];
    }
  | { req: NextApiRequest; res: NextApiResponse };
export const getServerSession = (ctx: GetServerSessionContext) => {
  return $getServerSession(ctx.req, ctx.res, authOptions);
};
