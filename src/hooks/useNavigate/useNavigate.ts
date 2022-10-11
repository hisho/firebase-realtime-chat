import { isFunction } from '@chakra-ui/utils'
import { PagesPath, pagesPath } from '@src/lib/pathpida/$path'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import type { UrlObject } from 'url'

type RouterPushFunction = (
  url: UrlObject | ((path: PagesPath) => UrlObject)
) => Promise<boolean>

/**
 * useRouterのwrapper
 * useRouterの中でもpage遷移関連の処理のみの責務を持つ
 *
 * @example
 * import { Button } from '@chakra-ui/react'
 *
 * const UseNavigateExample = () => {
 *   const { push, replace } = useNavigate()
 *
 *   return (
 *     <>
 *       pathを高階関数から取得するパターン
 *       <Button onClick={() => push((path) => path.home.$url())}>button</Button>
 *       pathをpagesPathから直接使うパターン
 *       <Button onClick={() => push(pagesPath.home.$url())}>button</Button>
 *       <Button onClick={() => replace((path) => path.home.$url())}>
 *         button
 *       </Button>
 *       <Button onClick={() => replace(pagesPath.home.$url())}>
 *        button
 *       </Button>
 *       <Button onClick={back}>button</Button>
 *       <Button onClick={replace}>button</Button>
 *     </>
 *   )
 * }
 */
export const useNavigate = () => {
  const router = useRouter()

  /**
   * _pushはreturnする必要はないが元の型がPromise<boolean>なのでreturnする
   */
  const push: RouterPushFunction = useCallback(
    (url) => router.push(isFunction(url) ? url(pagesPath) : url),
    [router]
  )

  /**
   * _replaceはreturnする必要はないが元の型がPromise<boolean>なのでreturnする
   */
  const replace: RouterPushFunction = useCallback(
    (url) => router.replace(isFunction(url) ? url(pagesPath) : url),
    [router]
  )

  return {
    back: router.back,
    push,
    reload: router.reload,
    replace,
  } as const
}
