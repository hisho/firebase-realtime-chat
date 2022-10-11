import { useCallback, useState } from 'react'

/**
 * loadingのuti hooks
 * - startLoading: loadingを開始する
 * - stopLoading: loadingを終了する
 */
export const useLoading = (initialState = false) => {
  const [isLoading, setLoading] = useState(initialState)

  const startLoading = useCallback(() => {
    setLoading(true)
  }, [setLoading])

  const stopLoading = useCallback(() => {
    setLoading(false)
  }, [setLoading])

  return { isLoading, startLoading, stopLoading } as const
}
