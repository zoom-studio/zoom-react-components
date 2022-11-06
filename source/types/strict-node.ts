import { ReactElement, ComponentPropsWithoutRef, ElementType } from 'react'

// export type StrictNode<NodeProps> =
//   | ReactElement<NodeProps>
//   | Array<ReactElement<NodeProps>>
// | ReactElement<SecondaryNodeProps>
// | Array<ReactElement<SecondaryNodeProps>>

type MaybeArray<T> = T[] | T

export type StrictNode<T> = MaybeArray<
  ReactElement<ComponentPropsWithoutRef<ElementType<T>>>
>
