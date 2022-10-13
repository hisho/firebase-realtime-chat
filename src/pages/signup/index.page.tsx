import { Button, Center, chakra, Container, Heading } from '@chakra-ui/react'
import { useSignUpForm } from '@src/feature/auth/component/SignUpForm/useSignUpForm'
import { SignUpForm } from '@src/feature/auth/component/SignUpForm/SignUpForm'
import { Spacer } from '@src/component/Spacer/Spacer'
import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'

const Page: NextPageWithLayout = () => {
  const signUp = useSignUpForm()

  return (
    <Container centerContent py={10}>
      <Heading textAlign={'center'}>新規アカウント登録</Heading>
      <Spacer h={10} />
      <Center maxW={'sm'} w={'full'}>
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
      </Center>
    </Container>
  )
}

Page.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>
}

export default Page
