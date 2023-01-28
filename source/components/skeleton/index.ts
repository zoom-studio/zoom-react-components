import { BaseComponent } from '../../types'

export namespace SkeletonNS {
  export interface BaseProps extends BaseComponent {
    animated?: boolean
  }
}

export * as Skeleton from './skeletons'
