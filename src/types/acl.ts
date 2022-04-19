import { Permission, PermissionName, Role, RoleName } from "api-ts-axios";

export interface Acl {
  hasPermissions: (userPermissions: Array<Permission>, requiredPermissions: Array<PermissionName>) => boolean;
  hasRoles: (userRoles: Array<Role>, requiredRoles: Array<RoleName>) => boolean;
  canViewApiDocumentation: (userPermissions: Array<Permission>) => boolean;
  canViewHorizon: (userPermissions: Array<Permission>) => boolean;
  canViewTelescope: (userPermissions: Array<Permission>) => boolean;
  canCreateUsers: (userPermissions: Array<Permission>) => boolean;
  canUpdateUsers: (userPermissions: Array<Permission>) => boolean;
  canDeleteUsers: (userPermissions: Array<Permission>) => boolean;
  canShowUsers: (userPermissions: Array<Permission>) => boolean;
  canListUsers: (userPermissions: Array<Permission>) => boolean;
  canListRoles: (userPermissions: Array<Permission>) => boolean;
  canListPermissions: (userPermissions: Array<Permission>) => boolean;
  canViewUserAddresses: (userPermissions: Array<Permission>) => boolean;
  canUpdateUserAddresses: (userPermissions: Array<Permission>) => boolean;
  canViewUserRoles: (userPermissions: Array<Permission>) => boolean;
  canUpdateUserRoles: (userPermissions: Array<Permission>) => boolean;
  canViewUserPermissions: (userPermissions: Array<Permission>) => boolean;
  canUpdateUserPermissions: (userPermissions: Array<Permission>) => boolean;
}

export interface AuthPermissions {
  api: {
    documentation: boolean,
    horizon: boolean,
    telescope: boolean,
  },
  permissions: {
    list: boolean
  },
  roles: {
    list: boolean
  },
  users: {
    create: boolean,
    update: boolean,
    delete: boolean,
    show: boolean,
    list: boolean,
    addresses: {
      list: boolean,
      update: boolean,
    },
    roles: {
      list: boolean,
      update: boolean,
    },
    permissions: {
      list: boolean,
      update: boolean,
    }
  }
}