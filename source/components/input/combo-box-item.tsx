import React, { forwardRef, useId, type HTMLAttributes } from 'react'

import { classNames } from '@zoom-studio/js-ts-utils'

import { Text } from '..'

export namespace ComboBoxItemNS {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    active: boolean
    item: string
  }
}

export const ComboBoxItem = forwardRef<HTMLDivElement, ComboBoxItemNS.Props>(
  ({ item, active, ...rest }, reference) => {
    const id = useId()

    const classes = classNames('combo-box-item', { active })

    return (
      <div {...rest} ref={reference} className={classes} id={id}>
        <Text large>{item}</Text>
      </div>
    )
  },
)
