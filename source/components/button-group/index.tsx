import React, { FC, HTMLAttributes } from 'react'
import { useZoomComponent } from '../../hooks'
import { Button, ButtonNS } from '../button'

export namespace ButtonGroupNS {
  export interface Props extends ButtonNS.Props {
    buttons: ButtonNS.Props[]
    direction?: 'column' | 'row'
    containerProps?: Omit<HTMLAttributes<HTMLDivElement>, 'children'>
  }
}

export const ButtonGroup: FC<ButtonGroupNS.Props> = ({
  direction = 'row',
  buttons,
  containerProps,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('button-group')

  const classes = createClassName(containerProps?.className, '', {
    [createClassName('', 'column')]: direction === 'column',
    [createClassName('', 'row')]: direction === 'row',
  })

  return (
    <div {...containerProps} className={classes}>
      {buttons.map((props, index) => (
        <Button key={index} {...rest} {...props} />
      ))}
    </div>
  )
}
