import { Grid } from '@chakra-ui/react'
import { FormControl } from '@src/component/Form/FormControl/FormControl'
import { InputControl } from '@src/component/Form/InputControl/InputControl'
import type { UseSignUpFormReturn } from '@src/feature/auth/component/SignUpForm/useSignUpForm'

type Props = Pick<UseSignUpFormReturn, 'form'>

export const SignUpForm = ({
  form: {
    control,
    formState: { errors },
  },
}: Props) => {
  return (
    <Grid gap={4}>
      <FormControl
        isRequired
        label={'メールアドレス'}
        errorMessages={errors?.email?.message}
      >
        <InputControl name={'email'} control={control} />
      </FormControl>
      <FormControl
        isRequired
        label={'パスワード'}
        errorMessages={errors?.password?.message}
      >
        <InputControl name={'password'} control={control} />
      </FormControl>
    </Grid>
  )
}
