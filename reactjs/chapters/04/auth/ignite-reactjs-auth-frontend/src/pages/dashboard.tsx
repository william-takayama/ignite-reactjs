import { Button, Flex, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import UserCan from '../components/UserCan'
import { AuthContext } from '../contexts/AuthContext'
import { setupAPIClient } from '../services/api'
import { User } from '../types/entities'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDir="column">
      <Text>Dashboard: {user?.email}</Text>

      <Flex>
        <Button onClick={() => signOut(true)} colorScheme="red" size="xs">
          Log out
        </Button>
      </Flex>

      <UserCan permissions={['metrics.list']}>
        <Flex>Metrics</Flex>
      </UserCan>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get<User>('/me')

  console.log(response)

  return {
    props: {},
  }
})
