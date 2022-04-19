import { PaginatedPermissions, PaginatedRoles, AuthUser } from "api-ts-axios";

const AUTH_USER_KEY = "authUser";
const AUTH_ROLES_KEY = "authRoles";
const AUTH_PERMISSIONS_KEY = "authPermissions";

interface StorageUtil {
  getUser: () => AuthUser | undefined;
  setUser: (user: AuthUser) => void;
  removeUser: () => void;
  getRoles: () => PaginatedRoles | undefined;
  setRoles: (roles: PaginatedRoles) => void;
  removeRoles: () => void;
  getPermissions: () => PaginatedPermissions | undefined;
  setPermissions: (permissions: PaginatedPermissions) => void;
  removePermissions: () => void;
}

const storageUtil: StorageUtil = {
  getUser: () => {
    const val = localStorage.getItem(AUTH_USER_KEY);
    if (val === null) {
      return undefined;
    }
    return JSON.parse(val) as AuthUser;
  },
  setUser: (user: AuthUser) =>
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user)),
  removeUser: () => localStorage.removeItem(AUTH_USER_KEY),
  getRoles: () => {
    const val = localStorage.getItem(AUTH_ROLES_KEY);
    if (val === null) {
      return undefined;
    }
    return JSON.parse(val) as PaginatedRoles;
  },
  setRoles: (roles: PaginatedRoles) =>
    localStorage.setItem(AUTH_ROLES_KEY, JSON.stringify(roles)),
  removeRoles: () => localStorage.removeItem(AUTH_ROLES_KEY),
  getPermissions: () => {
    const val = localStorage.getItem(AUTH_PERMISSIONS_KEY);
    if (val === null) {
      return undefined;
    }
    return JSON.parse(val) as PaginatedPermissions;
  },
  setPermissions: (roles: PaginatedPermissions) =>
    localStorage.setItem(AUTH_PERMISSIONS_KEY, JSON.stringify(roles)),
  removePermissions: () => localStorage.removeItem(AUTH_PERMISSIONS_KEY),
};

export default storageUtil