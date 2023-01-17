import { HTMLAttributes } from 'react'

export namespace SkeletonNS {
  export interface BaseProps extends HTMLAttributes<HTMLDivElement> {
    animated?: boolean
  }
}

export * as Skeleton from './skeletons'
