import React, { FC, ReactNode } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Button, Icon, IconNS, Text, Tooltip } from '../../..'

export namespace ActionButtonNS {
  export interface Props {
    title: string
    onClick?: () => void
    icon?: IconNS.Names
    content?: string | ReactNode
    isActive?: boolean
    disabled?: boolean
  }
}

export const ActionButton: FC<ActionButtonNS.Props> = ({
  title,
  content,
  icon,
  onClick,
  isActive,
  disabled,
}) => {
  const classes = classNames('action-button', {
    active: isActive,
  })

  return (
    <Tooltip title={title} hoverDelay={200}>
      <Button
        onClick={onClick}
        className={classes}
        disabled={disabled}
        style={{ opacity: disabled ? 0.5 : 1 }}
        shape="square"
        size="large"
        type="secondary"
      >
        {typeof content === 'string' ? <Text large>{content}</Text> : content}
        {icon && <Icon name={icon} />}
      </Button>
    </Tooltip>
  )
}
