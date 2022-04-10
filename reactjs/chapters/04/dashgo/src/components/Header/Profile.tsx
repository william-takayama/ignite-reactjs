import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData: boolean
}

export default function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr={4} textAlign="right">
          <Text>William S. Takayama</Text>
          <Text color="gray.300" fontSize="small">
            williamstakayama@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="William Takayama"
        src="https://github.com/William-takayama.png"
      />
    </Flex>
  )
}
