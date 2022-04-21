import { useQuery, UseQueryOptions } from 'react-query'
import { api } from './../api'

export type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

export type GetUsersReponse = {
  users: User[]
  totalCount: number
}

export async function getUsers(currentPage: number): Promise<GetUsersReponse> {
  const { data, headers } = await api.get('users', {
    params: { page: currentPage },
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }))

  return {
    users,
    totalCount,
  }
}

export function useUsers(
  currentPage: number,
  options?: UseQueryOptions<GetUsersReponse>
) {
  // ** which information triggers a new change **
  return useQuery(['users', currentPage], () => getUsers(currentPage), {
    // keeps data in fresh state for 10 minutes
    staleTime: 1000 * 60 * 10,
    ...options,
  })
}
