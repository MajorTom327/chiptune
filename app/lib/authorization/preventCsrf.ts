import { verifyAuthenticityToken } from "remix-utils";
import { sessionStorage } from '~/services/session.server';

export const preventCsrf = async (request: Request) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  await verifyAuthenticityToken(request, session);
}
