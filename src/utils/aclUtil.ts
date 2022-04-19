import { AuthUser, Permission, PermissionName, Role, RoleName } from "api-ts-axios";
import { Acl, AuthPermissions } from "@types";



const hasPermissions = (userPermissions: Array<Permission>, requiredPermissions: Array<PermissionName>): boolean => {
  const res = requiredPermissions.map(permission => userPermissions.findIndex(userPermission => userPermission.name === permission));
  return !res.includes(-1);
};

const hasRoles = (userRoles: Array<Role>, requiredRoles: Array<RoleName>): boolean => {
  const res = requiredRoles.map(role => userRoles.findIndex(userRole => userRole.name === role));
  return !res.includes(-1);
};

export const aclUtil: Acl = {
  hasPermissions,
  hasRoles,
  canViewApiDocumentation: (userPermissions) => hasPermissions(userPermissions, [PermissionName.view_api_documentation]),
  canViewHorizon: (userPermissions) => hasPermissions(userPermissions, [PermissionName.view_horizon]),
  canViewTelescope: (userPermissions) => hasPermissions(userPermissions, [PermissionName.view_horizon]),
  canCreateUsers: (userPermissions) => hasPermissions(userPermissions, [PermissionName.create_users]),
  canUpdateUsers: (userPermissions) => hasPermissions(userPermissions, [PermissionName.create_users]),
  canDeleteUsers: (userPermissions) => hasPermissions(userPermissions, [PermissionName.delete_users]),
  canShowUsers: (userPermissions) => hasPermissions(userPermissions, [PermissionName.show_users]),
  canListUsers: (userPermissions) => hasPermissions(userPermissions, [PermissionName.view_users]),
  canListRoles: (userPermissions) => hasPermissions(userPermissions, [PermissionName.view_roles]),
  canListPermissions: (userPermissions) => hasPermissions(userPermissions, [PermissionName.view_permissions]),
  canViewUserAddresses: (userPermissions) => hasPermissions(userPermissions, [PermissionName.view_user_addresses]),
  canUpdateUserAddresses: (userPermissions) => hasPermissions(userPermissions, [PermissionName.update_user_addresses]),
  canViewUserRoles: (userPermissions) => hasPermissions(userPermissions, [PermissionName.view_user_roles]),
  canUpdateUserRoles: (userPermissions) => hasPermissions(userPermissions, [PermissionName.update_user_roles]),
  canViewUserPermissions: (userPermissions) => hasPermissions(userPermissions, [PermissionName.view_user_permissions]),
  canUpdateUserPermissions: (userPermissions) => hasPermissions(userPermissions, [PermissionName.update_user_permissions]),
};

export const getAuthPermissions = (userPermissions: Array<Permission>): AuthPermissions =>  {
  const asdf: AuthPermissions = {
    api: {
      documentation: aclUtil.canViewApiDocumentation(userPermissions),
      horizon: aclUtil.canViewHorizon(userPermissions),
      telescope: aclUtil.canViewTelescope(userPermissions),
    },
    permissions: {
      list: aclUtil.canListPermissions(userPermissions),
    },
    roles: {
      list: aclUtil.canListPermissions(userPermissions),
    },
    users: {
      create: aclUtil.canCreateUsers(userPermissions),
      update: aclUtil.canUpdateUsers(userPermissions),
      delete: aclUtil.canDeleteUsers(userPermissions),
      show: aclUtil.canShowUsers(userPermissions),
      list: aclUtil.canListUsers(userPermissions),
      addresses: {
        list: aclUtil.canViewUserAddresses(userPermissions),
        update: aclUtil.canUpdateUserAddresses(userPermissions),
      },
      roles: {
        list: aclUtil.canViewUserRoles(userPermissions),
        update: aclUtil.canUpdateUserRoles(userPermissions),
      },
      permissions: {
        list: aclUtil.canViewUserPermissions(userPermissions),
        update: aclUtil.canUpdateUserPermissions(userPermissions),
      }
    }
  }
  return asdf
}

export const getUniqueUserPermissions = (user: AuthUser): Array<Permission> => {
  const unFilteredPermissions: Array<Permission> = user.permissions
  user.roles.forEach(role => unFilteredPermissions.push(...role.permissions))
  return unFilteredPermissions.filter((permission, index, allPermissions) => allPermissions.findIndex(t => t.id === permission.id) === index);
}