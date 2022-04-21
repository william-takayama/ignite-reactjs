import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as Yup from 'yup'
import { DashGoInput } from '../../components/Form/Input'
import { Header } from '../../components/Header/Header'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is mandatory'),
  email: Yup.string()
    .required('Email is mandatory')
    .email('Enter a valid email'),
  password: Yup.string()
    .required('Password is mandatory')
    .min(6, 'Password must have at least 6 chars'),
  password_confirmation: Yup.string().oneOf(
    [null, Yup.ref('password')],
    'Please match both passwords'
  ),
})

export default function UserCreate() {
  const router = useRouter()

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      })

      return response.data.user
    },
    {
      // revalidate cache
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data)
    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my={6} maxWidth={1480} mx="auto" px={6}>
        <Sidebar />

        <Box
          as="form"
          flex={1}
          borderRadius={8}
          bg="gray.800"
          p={[6, 8]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Create user
          </Heading>

          <Divider my={6} borderColor="gray.700" />

          <VStack spacing={8}>
            <SimpleGrid minChildWidth={240} spacing={[6, 8]} w="100%">
              <DashGoInput
                id="name"
                name="name"
                label="Full name"
                error={formState.errors.name}
                {...register('name')}
              />
              <DashGoInput
                id="email"
                name="email"
                label="Email"
                type="email"
                error={formState.errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth={240} spacing={[6, 8]} w="100%">
              <DashGoInput
                id="password"
                name="password"
                label="Password"
                type="password"
                error={formState.errors.password}
                {...register('password')}
              />
              <DashGoInput
                id="password_confirmation"
                name="password_confirmation"
                label="Confirm password"
                type="password"
                error={formState.errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={8} justify="flex-end">
            <HStack spacing={4}>
              <NextLink href="/users/create" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </NextLink>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
