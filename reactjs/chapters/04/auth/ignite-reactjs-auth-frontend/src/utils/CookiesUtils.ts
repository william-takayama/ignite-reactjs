import { GetServerSidePropsContext } from 'next'
import { destroyCookie, setCookie } from 'nookies'
import { Cookie } from '../types/entities'

type Tokens = {
  token: string
  refreshToken: string
}

// JWT token should expire fast, but it's a BE responsability
export const updateAuthTokens = (
  data: Tokens,
  ctx?: GetServerSidePropsContext
) => {
  setCookie(ctx, Cookie.NEXTAUTH_TOKEN, data.token, {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    // all urls will have access to this cookie
    path: '/',
  })

  setCookie(ctx, Cookie.NEXTAUTH_REFRESH_TOKEN, data.refreshToken, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
}

export const destroyAuthTokens = (ctx?: GetServerSidePropsContext) => {
  destroyCookie(ctx, Cookie.NEXTAUTH_TOKEN)
  destroyCookie(ctx, Cookie.NEXTAUTH_REFRESH_TOKEN)
}
