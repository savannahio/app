import { AuthUser, Permission, PermissionName, Role, RoleName } from "project-ts";

interface AclUtil {
  hasPermissions: (userPermissions: Array<Permission>, requiredPermissions: Array<PermissionName>) => boolean
  hasRoles: (userRoles: Array<Role>, requiredRoles: Array<RoleName>) => boolean
  canListUsers: (user?: AuthUser) => boolean
  canShowUsers: (user?: AuthUser) => boolean
}

const hasPermissions = (userPermissions: Array<Permission>, requiredPermissions: Array<PermissionName>): boolean => {
  const res = requiredPermissions.map(permission => userPermissions.findIndex(userPermission => userPermission.name === permission))
  return !res.includes(-1)
}

const hasRoles = (userRoles: Array<Role>, requiredRoles: Array<RoleName>): boolean => {
  const res = requiredRoles.map(role => userRoles.findIndex(userRole => userRole.name === role))
  return !res.includes(-1)
}

export const aclUtil: AclUtil = {
  hasPermissions,
  hasRoles,
  canListUsers: (user) => {
    if (!user) return false
    return hasPermissions(user.permissions, [PermissionName.view_users])
  },
  canShowUsers: (user) => {
    if (!user) return false
    return hasPermissions(user.permissions, [PermissionName.show_users])
  }
}
