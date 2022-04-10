import { Button, Flex, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { DashGoInput } from '../components/Form/Input'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is mandatory')
    .email('Enter a valid email'),
  password: Yup.string().required('Password is mandatory'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <DashGoInput
            name="email"
            type="email"
            label="E-mail"
            error={formState.errors.email}
            {...register('email')}
          />
          <DashGoInput
            name="password"
            type="password"
            label="Password"
            {...register('password')}
            error={formState.errors.password}
          />
        </Stack>

        <Button
          type="submit"
          mt={6}
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Log in
        </Button>
      </Flex>
    </Flex>
  )
}
