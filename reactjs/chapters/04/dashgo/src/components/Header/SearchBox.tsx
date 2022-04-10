import { Flex, Icon, Input } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export default function SearchBox() {
  return (
    <Flex
      as="label" // hack to receive focus
      flex={1}
      py={4}
      px={8}
      ml={6}
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        placeholder="Search on platform"
        _placeholder={{ color: 'gray.400' }}
        pr={4}
        mr={4}
      />

      <Icon as={RiSearchLine} fontSize={20} />
    </Flex>
  )
}
