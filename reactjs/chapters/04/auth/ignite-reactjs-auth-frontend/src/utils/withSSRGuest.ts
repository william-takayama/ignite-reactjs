import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { parseCookies } from 'nookies'
import { Cookie } from '../types/entities'
import { SSRRedirects } from './redirects'

export function withSSRGuest<P>(callback: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { [Cookie.NEXTAUTH_TOKEN]: token } = parseCookies(ctx)

    if (token) {
      return SSRRedirects.dashboard()
    }

    return await callback(ctx)
  }
}
