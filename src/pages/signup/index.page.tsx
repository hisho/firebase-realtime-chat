import {
  Button,
  Center,
  chakra,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useSignUpForm } from '@src/feature/auth/component/SignUpForm/useSignUpForm'
import { SignUpForm } from '@src/feature/auth/component/SignUpForm/SignUpForm'
import { Spacer } from '@src/component/Spacer/Spacer'
import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { useState } from 'react'
import { UpdateProfileForm } from '@src/feature/auth/component/UpdateProfileForm/UpdateProfileForm'
import { useUpdateProfileForm } from '@src/feature/auth/component/UpdateProfileForm/useUpdateProfileForm'
import { Navigate } from '@src/component/Navigate/Navigate'

const Page: NextPageWithLayout = () => {
  const [step, setStep] = useState<'signUp' | 'updateProfile' | 'complete'>(
    'signUp'
  )
  const signUp = useSignUpForm({
    onCompleted: () => {
      setStep('updateProfile')
    },
  })

  const { user } = useAuthContext()
  const onCompleteSignUp = () => {
    setStep('complete')
  }
  const updateProfile = useUpdateProfileForm({
    onCompleted: () => {
      onCompleteSignUp()
    },
  })

  return (
    <Container centerContent py={10}>
      <Heading textAlign={'center'}>新規アカウント登録</Heading>
      <Spacer h={10} />
      <Center maxW={'sm'} w={'full'}>
        {step === 'signUp' ? (
          <chakra.form
            onSubmit={signUp.form.handleSubmit(signUp.handleSignUp)}
            w={'full'}
          >
            <SignUpForm form={signUp.form} />
            <Spacer h={6} />
            <Center>
              <Button isLoading={signUp.isLoading} type={'submit'}>
                登録する
              </Button>
            </Center>
          </chakra.form>
        ) : step === 'updateProfile' ? (
          <chakra.form
            onSubmit={updateProfile.form.handleSubmit((input) =>
              updateProfile.handleUpdateProfile(user, input)
            )}
            w={'full'}
          >
            <UpdateProfileForm form={updateProfile.form} />
            <Spacer h={6} />
            <Center flexDirection={'column'}>
              <Button isLoading={updateProfile.isLoading} type={'submit'}>
                登録する
              </Button>
              <Spacer h={2} />
              <Button
                fontSize={'12px'}
                variant={'link'}
                onClick={onCompleteSignUp}
              >
                項目をスキップする
              </Button>
            </Center>
          </chakra.form>
        ) : (
          <Center flexDirection={'column'}>
            <Text>アカウントを作成しました🎉</Text>
            <Spacer h={4} />
            <Navigate href={(path) => path.account.$url()}>
              <Button as={'a'}>アカウントページへ</Button>
            </Navigate>
          </Center>
        )}
      </Center>
    </Container>
  )
}

Page.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>
}

export default Page
