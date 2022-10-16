import { chakra, Container, Flex, forwardRef } from '@chakra-ui/react'
import { Navigate } from '@src/component/Navigate/Navigate'
import type { ComponentProps } from 'react'

const Link = forwardRef<
  Pick<ComponentProps<'a'>, 'href' | 'children' | 'onClick'>,
  'a'
>(({ children, ...props }, ref) => {
  return (
    <chakra.a
      ref={ref}
      color={'white'}
      fontWeight={'bold'}
      fontSize={'14px'}
      _hover={{
        textDecoration: 'underline',
      }}
      {...props}
    >
      {children}
    </chakra.a>
  )
})

export const footerHeight = '180px'

export const Footer = () => {
  return (
    <chakra.footer>
      <Container h={'full'} py={6} bgColor={'blue.800'} height={footerHeight}>
        <Flex flexDirection={'column'} gap={2}>
          <Navigate href={(path) => path.$url()}>
            <Link>トップページ</Link>
          </Navigate>
          <Navigate href={(path) => path.signup.$url()}>
            <Link>新規会員登録</Link>
          </Navigate>
          <Navigate href={(path) => path.signin.$url()}>
            <Link>ログイン</Link>
          </Navigate>
          <Navigate href={(path) => path.rooms.$url()}>
            <Link>ルーム一覧</Link>
          </Navigate>
        </Flex>
      </Container>
    </chakra.footer>
  )
}
