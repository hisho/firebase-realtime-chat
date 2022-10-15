import type { MaybeRenderProp } from '@chakra-ui/react-utils'
import { isFunction, runIfFn } from '@chakra-ui/utils'
import { PagesPath, pagesPath } from '@src/lib/pathpida/$path'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import type { UrlObject } from 'url'

type NavigateProps = Omit<LinkProps, 'href' | 'passHref' | 'locale'> & {
  children: MaybeRenderProp<{ isCurrent: boolean }>
  href: ((path: PagesPath) => UrlObject) | UrlObject
}

/**
 * ページ遷移するためのリンクを表示するコンポーネント
 * hrefから返ってくる値はpathpidaのpagesPath
 * @see https://nextjs.org/docs/api-reference/next/link
 * @see https://github.com/vercel/next.js/blob/canary/packages/next/client/link.tsx
 * @example
 * hrefの高階関数を使ってリンクを表示する場合
 * <Navigate href={(path) => path.home.$url()}>
 * <a>hoge</a>
 * </Navigate>
 *
 * hrefの高階関数を使わずに直接pagesPathを渡す場合
 * <Navigate href={pagesPath.home.$url()}>
 * <a>hoge</a>
 * </Navigate>
 *
 * Buttonをaタグにキャストする場合
 * <Navigate href={(path) => path.home.$url()}>
 * <Button as={'a'}>hoge</Button>
 * </Navigate>
 *
 * Function as Childを使ってstateを使う場合
 * <Navigate href={(path) => path.home.$url()}>
 * {({ isCurrent }) => <a>{isCurrent ? '現在のページ' : 'その他'}</a>}
 * </Navigate>
 */
export const Navigate = ({ children, href, ...props }: NavigateProps) => {
  const { pathname } = useRouter()
  const currentPathname = isFunction(href)
    ? href(pagesPath).pathname
    : href.pathname
  const isCurrent = pathname === currentPathname
  const state = { isCurrent }
  return (
    <Link passHref href={isFunction(href) ? href(pagesPath) : href} {...props}>
      {runIfFn(children, state)}
    </Link>
  )
}
