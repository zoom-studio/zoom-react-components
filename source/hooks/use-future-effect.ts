import { useEffect, useRef } from 'react'

export const useFutureEffect: typeof useEffect = (effect, deps) => {
  const isComponentMounted = useRef(false)

  useEffect(() => {
    if (isComponentMounted.current) {
      effect()
    }
  }, deps)

  useEffect(() => {
    isComponentMounted.current = true
  }, [])
}
