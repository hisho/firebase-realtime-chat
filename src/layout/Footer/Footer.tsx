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

export const Footer = () => {
  return (
    <chakra.footer py={10} bgColor={'blue.800'}>
      <Container>
        <Flex flexDirection={'column'} gap={2}>
          <Navigate href={(path) => path.$url()}>
            <Link>トップページ</Link>
          </Navigate>
          <Navigate href={(path) => path.signup.$url()}>
            <Link>新規会員登録</Link>
          </Navigate>
        </Flex>
      </Container>
    </chakra.footer>
  )
}
