import { UserRoleAndPermissions } from '../types/entities'

type validateUserPermissionsParams = {
  user: UserRoleAndPermissions
  permissions?: string[]
  roles?: string[]
}

export function validateUserPermissions({
  user,
  permissions,
  roles,
}: validateUserPermissionsParams) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every((persmission) =>
      user.permissions.includes(persmission)
    )

    if (!hasAllPermissions) {
      return false
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some((role) => user.roles.includes(role))

    if (!hasAllRoles) {
      return false
    }
  }

  return true
}
