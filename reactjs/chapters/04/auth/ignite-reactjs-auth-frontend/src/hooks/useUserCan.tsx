import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { validateUserPermissions } from '../utils/validateUserPermissions'

type UsePermissions = {
  permissions?: string[]
  roles?: string[]
}

// For safety we need to have a validation on BE
export function useUserCan({ permissions, roles }: UsePermissions) {
  const { isAuthenticated, user } = useContext(AuthContext)

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  })

  return userHasValidPermissions
}
