import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { FieldValues, UseFormSetError } from 'react-hook-form'
import { authChannel, useBroadcastChannel } from '../hooks/useBroadcastChannel'
import { api } from '../services/apiClient'
import { Cookie, User, UserRoleAndPermissions } from '../types/entities'
import { Route } from '../types/routes'
import { destroyAuthTokens, updateAuthTokens } from '../utils/CookiesUtils'
import { SSRRedirects } from '../utils/redirects'

type SessionsApiReponseData = UserRoleAndPermissions & {
  refreshToken: string
  token: string
}

export type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (
    credentials: SignInCredentials,
    handleError?: UseFormSetError<FieldValues>
  ) => Promise<void>
  signOut: (broadcast: boolean) => void
  isAuthenticated: boolean
  user: User | undefined
}

interface AuthProviderProps {
  children: ReactNode
}

export async function signOutSSR<P>(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<P>> {
  destroyAuthTokens(ctx)

  return SSRRedirects.home()
}

export const signOutClient: AuthContextData['signOut'] = (broadcast = true) => {
  destroyAuthTokens(undefined)

  if (broadcast && typeof window !== 'undefined') {
    authChannel?.postMessage({ type: 'signOut' })
  }

  Router.push('/')
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()

  useBroadcastChannel()

  useEffect(() => {
    // we could retrieve user's info by decoding the JWT token.
    // But some fields such as roles and permissions could change
    // (that's why it's better to refetch)
    const { [Cookie.NEXTAUTH_TOKEN]: token } = parseCookies()

    if (token) {
      api
        .get('/me')
        .then(({ data }: { data: User }) => {
          const { email, permissions, roles } = data
          setUser({ email, permissions, roles })
        })
        .catch(() => {
          signOutClient(false)
        })
    }

    setUser(user)
  }, [])

  const signIn: AuthContextData['signIn'] = async (
    { email, password },
    handleError
  ) => {
    try {
      const response = await api.post<SessionsApiReponseData>('sessions', {
        email,
        password,
      })

      const { permissions, roles, token, refreshToken } = response.data

      updateAuthTokens({ token, refreshToken })
      setUser({ email, permissions, roles })

      // [IMPORTANT] to avoid undefined token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      authChannel?.postMessage({ type: 'signIn' })

      Router.push(Route.DASHBOARD)
    } catch (error) {
      console.error(error)
      if (handleError) {
        handleError('apiError', { message: error.response?.data?.message })
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, signIn, signOut: signOutClient }}
    >
      {children}
    </AuthContext.Provider>
  )
}
