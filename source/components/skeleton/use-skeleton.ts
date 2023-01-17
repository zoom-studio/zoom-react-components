import { SkeletonNS } from '.'
import { useZoomComponent } from '../../hooks'

export const useSkeleton = ({ animated = true }: SkeletonNS.BaseProps) => {
  const { createClassName } = useZoomComponent('skeleton')

  const animatedClasses = createClassName('', '', {
    [createClassName('', 'animated')]: !!animated,
  })

  return { animatedClasses }
}
