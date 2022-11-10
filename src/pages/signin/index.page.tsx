import { Button, Center, chakra, Container, Heading } from '@chakra-ui/react'
import { Spacer } from '@src/component/Spacer/Spacer'
import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { useSignInForm } from '@src/feature/auth/component/SignInForm/useSignInForm'
import { useNavigate } from '@src/hooks/useNavigate/useNavigate'
import { SignInForm } from '@src/feature/auth/component/SignInForm/SignInForm'
import { useRouter } from '@src/hooks/useRouter/useRouter'
import { z } from 'zod'

export type OptionalQuery = {
  redirect: string
}

const Page: NextPageWithLayout = () => {
  const { push } = useNavigate()
  const { query } = useRouter()
  const parsedQueryParams = z
    .object({
      redirect: z.string(),
    })
    .safeParse(query)
  const { form, handleSignIn, isLoading } = useSignInForm({
    onCompleted: () => {
      if (parsedQueryParams.success) {
        const { redirect } = parsedQueryParams.data
        const [pathname, search] = redirect.split('?')
        push({ pathname, search })
      }
      push((path) => path.$url())
    },
  })
  const { handleSubmit } = form

  return (
    <Container centerContent py={10}>
      <Heading textAlign={'center'}>ログイン</Heading>
      <Spacer h={10} />
      <Center maxW={'sm'} w={'full'}>
        <chakra.form onSubmit={handleSubmit(handleSignIn)} w={'full'}>
          <SignInForm form={form} />
          <Spacer h={6} />
          <Center>
            <Button isLoading={isLoading} type={'submit'}>
              ログインする
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
