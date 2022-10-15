import type { UseUpdateProfileFormReturn } from '@src/feature/auth/component/UpdateProfileForm/useUpdateProfileForm'
import { Grid } from '@chakra-ui/react'
import { FormControl } from '@src/component/Form/FormControl/FormControl'
import { InputControl } from '@src/component/Form/InputControl/InputControl'

export const UpdateProfileForm = ({
  form: {
    control,
    formState: { errors },
  },
}: Pick<UseUpdateProfileFormReturn, 'form'>) => {
  return (
    <Grid gap={4}>
      <FormControl
        label={'ニックネーム'}
        errorMessages={errors?.displayName?.message}
      >
        <InputControl name={'displayName'} control={control} />
      </FormControl>
    </Grid>
  )
}
