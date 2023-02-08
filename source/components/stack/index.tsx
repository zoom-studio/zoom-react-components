import React, { FC, Children, ReactNode } from 'react'
import { useZoomComponent } from '../../hooks'
import { BaseComponent, MaybeArray } from '../../types'
import { StackItem } from './stack-item'

export namespace StackNS {
  export const BaseCSSValues = ['initial', 'unset', 'inherit'] as const
  export type BaseCSSValues = typeof BaseCSSValues[number]

  export const Aligns = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const
  export type Aligns = typeof Aligns[number] | BaseCSSValues

  export const Directions = ['row', 'row-reverse', 'column', 'column-reverse'] as const
  export type Directions = typeof Directions[number] | BaseCSSValues

  export const Justifies = [
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
  ] as const
  export type Justifies = typeof Justifies[number] | BaseCSSValues

  export interface Props extends BaseComponent {
    align?: Aligns
    justify?: Justifies
    direction?: Directions
    spacing?: number | string
    broken?: boolean
    inline?: boolean
    dividerFirst?: boolean
    dividers?: MaybeArray<ReactNode>
  }

  export interface StackComponent extends FC<StackNS.Props> {
    item: typeof StackItem
  }
}

export const Stack: StackNS.StackComponent = ({
  align = 'center',
  justify = 'flex-start',
  direction = 'row',
  spacing = 6,
  dividerFirst,
  dividers,
  inline,
  broken,
  children,
  className,
  containerProps,
  reference,
  style,
}: StackNS.Props) => {
  const { createClassName } = useZoomComponent('stack')

  const filterChildren = Children.toArray(children)
  const childrenCount = filterChildren.length

  const getDivider = (childIndex: number) => {
    return dividers &&
      typeof dividers !== 'string' &&
      typeof dividers !== 'number' &&
      typeof dividers !== 'boolean' &&
      'length' in dividers
      ? dividers[childIndex]
      : dividers
  }

  const classes = createClassName(className, '', {
    [createClassName('', `align-${align}`)]: true,
    [createClassName('', `justify-${justify}`)]: true,
    [createClassName('', `direction-${direction}`)]: true,
    [createClassName('', 'broken')]: !!broken,
    [createClassName('', 'inline')]: !!inline,
  })

  return (
    <div
      {...containerProps}
      ref={reference}
      className={classes}
      style={{ ...style, gap: style?.gap ?? spacing }}
    >
      {Children.map(filterChildren as React.ReactElement[], (child, index) => {
        const childNode = child.type !== StackItem ? <StackItem>{child}</StackItem> : child

        return [
          dividerFirst ? getDivider(index) : null,
          childNode,
          index < childrenCount - 1 && !dividerFirst ? getDivider(index) : null,
        ]
      })}
    </div>
  )
}

Stack.item = StackItem
