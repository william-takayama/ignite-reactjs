import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { signOutClient } from '../contexts/AuthContext'
import { AuthTokenError } from '../errors/authTokenError'
import { Cookie } from '../types/entities'
import { updateAuthTokens } from '../utils/CookiesUtils'

let isRefreshing = false
let failedRequestsQueue = []

export function setupAPIClient(ctx: GetServerSidePropsContext = undefined) {
  let cookies = parseCookies(ctx)

  const updateTokenOnRequests = (token: string | undefined) => {
    // [IMPORTANT] to avoid undefined token
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  const refreshTokenRequest = async (refreshToken: string) => {
    api
      .post('/refresh', {
        refreshToken,
      })
      .then((response) => {
        const { token } = response.data
        const tokenData = {
          token,
          refreshToken: response.data.refreshToken,
        }

        updateAuthTokens(tokenData, ctx)
        updateTokenOnRequests(token)

        // Injecting new token on other requests
        failedRequestsQueue.forEach((request) => request.onSuccess(token))
        failedRequestsQueue = []

        if (typeof window !== 'undefined') {
          signOutClient(false)
        }
      })
      .catch((error) => {
        failedRequestsQueue.forEach((request) => request.onFailure(error))
        failedRequestsQueue = []
      })
      .finally(() => {
        isRefreshing = false
      })
  }

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    // Add token in all requests
    headers: {
      Authorization: `Bearer ${cookies[Cookie.NEXTAUTH_TOKEN]}`,
    },
  })

  // REFRESH TOKEN
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        // token renewal
        // [IMPORTANT] - We must create "queue of requests" while token is being refreshed
        // if we don't do that we will get an error as the requests would be concurrency
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)

          const { [Cookie.NEXTAUTH_REFRESH_TOKEN]: refreshToken } = cookies

          if (!isRefreshing) {
            isRefreshing = true
            refreshTokenRequest(refreshToken)
          }

          // All configurations/info to repeat requests
          const originalConfig = error.config
          // Creating our queue of requests
          // we cannot use async await with axios here
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (newToken: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${newToken}`

                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          if (typeof window !== 'undefined') {
            signOutClient(false)
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      // keep axios error flow
      return Promise.reject(error)
    }
  )

  return api
}
