import decode from 'jwt-decode'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { parseCookies } from 'nookies'
import { signOutSSR } from '../contexts/AuthContext'
import { AuthTokenError } from '../errors/authTokenError'
import { Cookie, UserRoleAndPermissions } from '../types/entities'
import { SSRRedirects } from './redirects'
import { validateUserPermissions } from './validateUserPermissions'

type WithSSRAuthOptions = Partial<UserRoleAndPermissions>

export function withSSRAuth<P>(
  callback: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { [Cookie.NEXTAUTH_TOKEN]: token } = parseCookies(ctx)

    if (!token) {
      return SSRRedirects.home()
    }

    if (!!options) {
      const user = decode<UserRoleAndPermissions>(token)
      const { permissions, roles } = user

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles,
      })

      if (!userHasValidPermissions) {
        return SSRRedirects.dashboard()
      }
    }

    try {
      return await callback(ctx)
    } catch (error) {
      if (error instanceof AuthTokenError) {
        return signOutSSR(ctx)
      }
      console.error(error)
    }
  }
}
