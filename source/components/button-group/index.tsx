import React, { forwardRef } from 'react'

import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'
import { Button, type ButtonNS } from '..'

export namespace ButtonGroupNS {
  export interface Props extends BaseComponent {
    buttonsProps?: ButtonNS.Props
    buttons: ButtonNS.Props[]
    direction?: 'column' | 'row'
  }
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupNS.Props>(
  (
    { direction = 'row', buttons, containerProps, buttonsProps, className, children, ...rest },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('button-group')

    const classes = createClassName(className, '', {
      [createClassName('', 'column')]: direction === 'column',
      [createClassName('', 'row')]: direction === 'row',
    })

    return (
      <div {...containerProps} {...rest} ref={reference} className={classes}>
        {buttons.map((props, index) => (
          <Button
            key={index}
            full={direction === 'column'}
            children={props.children ?? children}
            {...buttonsProps}
            {...props}
          />
        ))}
      </div>
    )
  },
)
