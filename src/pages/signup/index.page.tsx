import { Button, Center, chakra, Container, Heading } from '@chakra-ui/react'
import { useSignUpForm } from '@src/feature/auth/component/SignUpForm/useSignUpForm'
import { SignUpForm } from '@src/feature/auth/component/SignUpForm/SignUpForm'
import { Spacer } from '@src/component/Spacer/Spacer'

const Page = () => {
  const { form, handleSignUp, isLoading } = useSignUpForm()
  const { handleSubmit } = form

  return (
    <Container centerContent py={10}>
      <Heading textAlign={'center'}>新規アカウント登録</Heading>
      <Spacer h={10} />
      <Center maxW={'sm'} w={'full'}>
        <chakra.form onSubmit={handleSubmit(handleSignUp)} w={'full'}>
          <SignUpForm form={form} />
          <Spacer h={6} />
          <Center>
            <Button isLoading={isLoading} type={'submit'}>
              登録する
            </Button>
          </Center>
        </chakra.form>
      </Center>
    </Container>
  )
}

export default Page
