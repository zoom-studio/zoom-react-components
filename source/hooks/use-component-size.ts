import { CommonSize } from '../types'
import { useZoomContext } from './use-zoom-context'

export const useComponentSize = (providedSize?: CommonSize) => {
  const { defaultComponentsSize } = useZoomContext()
  return providedSize ?? defaultComponentsSize
}
