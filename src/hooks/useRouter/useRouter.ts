import { useRouter as _useRouter } from 'next/router'

export const useRouter = () => {
  const nextRouter = _useRouter()

  return {
    pathname: nextRouter.pathname,
    query: nextRouter.query,
    asPath: nextRouter.asPath,
  } as const
}
