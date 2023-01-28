import React, { FC } from 'react'
import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'
import { Button, ButtonNS } from '../button'

export namespace ButtonGroupNS {
  export interface Props extends BaseComponent {
    buttonsProps?: ButtonNS.Props
    buttons: ButtonNS.Props[]
    direction?: 'column' | 'row'
  }
}

export const ButtonGroup: FC<ButtonGroupNS.Props> = ({
  direction = 'row',
  buttons,
  containerProps,
  buttonsProps,
  className,
  reference,
  children,
  ...rest
}) => {
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
}
