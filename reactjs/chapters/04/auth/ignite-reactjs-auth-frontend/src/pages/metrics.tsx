import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Metrics() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDir="column">
      <Text>Metrics</Text>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
)
