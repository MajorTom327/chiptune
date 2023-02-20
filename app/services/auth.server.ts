import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage } from './session.server';
import zod from 'zod';
import { isNil } from 'ramda';
import { badRequest } from 'remix-utils';
import authController from '~/controllers/AuthController';
import type { UserSession } from '~/types/UserSession';
import logger from '~/lib/logger.server';

export const authenticator = new Authenticator<UserSession>(sessionStorage)

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email') as string | null;
    const password = form.get('password') as string | null;

    const loginInfo = zod.object({
      email: zod.string().email().min(1),
      password: zod.string().min(1),
    }).parse({ email, password });

    const user = await authController.login(loginInfo.email, loginInfo.password);
    logger.info("User logged in", { user })

    if (isNil(user)) {
      throw badRequest('Invalid email or password', { headers: { 'Content-Type': 'text/plain' } });
    }

    return user
  }),
  'user-pass'
);

export default authenticator;
