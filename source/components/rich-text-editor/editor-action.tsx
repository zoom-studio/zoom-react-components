import React, { FC } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Button, ConditionalWrapper, IconNS, Popover, PopoverNS, Text, Tooltip } from '..'

export namespace EditorActionNS {
  export interface Popover
    extends Pick<
      PopoverNS.Props,
      | 'className'
      | 'onClose'
      | 'disabled'
      | 'content'
      | 'isOpen'
      | 'onOpenChange'
      | 'width'
      | 'placement'
    > {}

  export interface Props {
    onClick?: () => void
    icon?: IconNS.Names
    text?: string
    title: string
    isActive?: boolean
    disabled?: boolean
    popover?: Popover
  }
}

export const EditorAction: FC<EditorActionNS.Props> = ({
  onClick,
  icon,
  text,
  title,
  isActive,
  disabled,
  popover,
}) => {
  const classes = classNames('editor-action', {
    active: isActive,
  })

  return (
    <div className={classes}>
      <ConditionalWrapper
        condition={!!popover}
        falseWrapper={children => <>{children}</>}
        trueWrapper={children => (
          <Popover trigger="click" placement="bottom" {...popover}>
            <>{children}</>
          </Popover>
        )}
      >
        <Tooltip title={title} hoverDelay={200}>
          <Button
            onClick={onClick}
            prefixMaterialIcon={icon}
            style={{ opacity: disabled ? 0.5 : 1 }}
            disabled={disabled}
            className="action-button"
            type="secondary"
            shape="square"
          >
            {text && <Text className="action-button-text">{text}</Text>}
          </Button>
        </Tooltip>
      </ConditionalWrapper>
    </div>
  )
}
