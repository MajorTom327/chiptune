import { useMatchesData } from '../useMatchesData';
import { isNil } from 'ramda';
import type { UserSession } from '~/types/UserSession';



export function useOptionalUser(): UserSession | undefined {
  const data = useMatchesData<UserSession | null>("root");
  if (!data || isNil(data.user)) {
    return undefined;
  }
  return data.user;
}
