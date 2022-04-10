import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface DashGoInputProps extends InputProps {
  name: string
  label?: string
  error?: FieldError
}

export const DashGoInput = forwardRef<HTMLInputElement, DashGoInputProps>(
  ({ name, label, error = null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}
        <Input
          id={name}
          name={name}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{ bgColor: 'gray.900' }}
          size="lg"
          ref={ref}
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }
)

DashGoInput.displayName = 'DashGoInput'
