import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  pageNumber: number
  isCurrentPage?: boolean
}

export default function PaginationItem({
  pageNumber,
  isCurrentPage = false,
}: PaginationItemProps) {
  return isCurrentPage ? (
    <Button
      size="sm"
      fontSize="xs"
      width={4}
      colorScheme="pink"
      disabled
      _disabled={{ bg: 'pink.500', cursor: 'default' }}
    >
      {pageNumber}
    </Button>
  ) : (
    <Button
      size="sm"
      fontSize="xs"
      width={4}
      bg="gray.700"
      _hover={{ bg: 'gray.500' }}
    >
      {pageNumber}
    </Button>
  )
}
