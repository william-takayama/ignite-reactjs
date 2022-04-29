import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import type { NextPage } from 'next'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { AuthContext, SignInCredentials } from '../contexts/AuthContext'
import { withSSRGuest } from '../utils/withSSRGuest'

const signInFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: Yup.string().required('Password is required'),
})

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  const { signIn } = useContext(AuthContext)

  const handleSignIn: SubmitHandler<SignInCredentials> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await signIn(data, setError)
  }

  const emailError = errors.email
  const passwordError = errors.password
  const apiError = errors.apiError

  const passwordHasError = !!passwordError || !!apiError

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDir="column">
      <Flex
        as="form"
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
        width="100%"
        maxWidth={360}
      >
        <Stack spacing={4}>
          <FormControl isInvalid={!!emailError}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              {...register('email')}
            />
            {emailError && (
              <FormErrorMessage>{emailError.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={passwordHasError}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              name="password"
              {...register('password')}
            />
            <FormErrorMessage>
              <>
                {passwordError && <>{passwordError.message}</>}
                {apiError?.message && <>{apiError.message}</>}
              </>
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          isLoading={isSubmitting}
          mt={8}
        >
          Log in
        </Button>
      </Flex>
    </Flex>
  )
}

export default Home

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})
