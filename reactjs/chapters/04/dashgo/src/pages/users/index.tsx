import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
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
import { RiAddLine, RiEditLine } from 'react-icons/ri'
import { Header } from '../../components/Header/Header'
import { Pagination } from '../../components/Pagination/Pagination'
import { Sidebar } from '../../components/Sidebar/Sidebar'

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>
      <Header />

      <Flex w="100%" my={6} maxWidth={1480} mx="auto" px={6}>
        <Sidebar />

        <Box flex={1} borderRadius={8} bg="gray.800" p={8}>
          <Flex mb={8} justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
            </Heading>

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
          </Flex>

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
              <Tr>
                <Td px={[4, 4, 6]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">William Takayama</Text>
                    <Text fontSize="sm" color="gray.300">
                      williamstakayama@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && (
                  <>
                    <Td>April 09, 2022</Td>
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
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}
