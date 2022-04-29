export type User = UserRoleAndPermissions & {
  email: string
}

export type UserRoleAndPermissions = {
  permissions: string[]
  roles: string[]
}

export enum Cookie {
  NEXTAUTH_TOKEN = 'nextauth.token',
  NEXTAUTH_REFRESH_TOKEN = 'nextauth.refreshToken',
}
