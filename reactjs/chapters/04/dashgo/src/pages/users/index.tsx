import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import { RiAddLine, RiEditLine, RiRefreshLine } from 'react-icons/ri'
import { Header } from '../../components/Header/Header'
import { Pagination } from '../../components/Pagination/Pagination'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { api } from '../../services/api'
import { useUsers } from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isFetching, error, refetch } = useUsers(
    currentPage
    // {
    //   initialData: users,
    // }
  )

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['users', userId],
      async () => (await api.get(`users/${userId}`)).data,
      {
        staleTime: 1000 * 60 * 10, // fresh data for 10 minutes
      }
    )
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my={6} maxWidth={1480} mx="auto" px={6}>
        <Sidebar />

        <Box flex={1} borderRadius={8} bg="gray.800" p={8}>
          <Flex mb={8} justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
              {/* Only on data renewal, not on on first load */}
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml={4} />
              )}
            </Heading>

            <Box>
              <IconButton
                aria-label="refetch"
                icon={<Icon as={RiRefreshLine} fontSize={16} />}
                mr={4}
                colorScheme="pink"
                size="sm"
                onClick={() => refetch()}
              />

              <NextLink href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="small"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                >
                  Create new
                </Button>
              </NextLink>
            </Box>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Failed fetching user data</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={[4, 4, 6]} color="gray.300" w={8}>
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>User</Th>
                    {isWideVersion && <Th>Registration Date</Th>}
                    <Th w={8}></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={[4, 4, 6]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <>
                          <Td>{user.createdAt}</Td>
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="small"
                              colorScheme="whiteAlpha"
                              leftIcon={<Icon as={RiEditLine} fontSize={16} />}
                            >
                              Edit
                            </Button>
                          </Td>
                        </>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

// this won't work with miragejs

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1)

//   return {
//     props: {
//       users,
//       totalCount,
//     },
//   }
// }
