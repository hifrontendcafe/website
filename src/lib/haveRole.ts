import { ChixRoleId } from './constants';

export function isChix(roles: string[]) {
  return roles?.includes(ChixRoleId);
}
