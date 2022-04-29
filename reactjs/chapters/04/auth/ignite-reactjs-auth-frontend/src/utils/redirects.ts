import { Redirect } from 'next'
import { Route } from '../types/routes'

type CustomRedirects = {
  home: () => { redirect: Redirect }
  dashboard: () => { redirect: Redirect }
}

// permanest = false -> means HTTP 302 = temporary redirect
export const SSRRedirects: CustomRedirects = {
  home: () => ({
    redirect: {
      destination: Route.HOME,
      permanent: false,
    },
  }),
  dashboard: () => ({
    redirect: {
      destination: Route.DASHBOARD,
      permanent: false,
    },
  }),
}
