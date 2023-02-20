import { Duration } from 'luxon';
import { RoleEnum } from '~/enums/RoleEnum';

export const blockSize = Duration.fromObject({ day: 1 }).as('seconds');
export const pageSize = 10

export const defaultRole = RoleEnum.user;
