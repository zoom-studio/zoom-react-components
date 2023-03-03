import { classNames } from '@zoom-studio/zoom-js-ts-utils'
import React, { FC } from 'react'

import { Button, IconNS, Tooltip } from '..'

export namespace EditorActionButtonNS {
  export interface Props {
    icon: IconNS.Names
    title: string
    isActive?: boolean
    onClick: () => void
    className?: string
  }
}

export const EditorActionButton: FC<EditorActionButtonNS.Props> = ({
  icon,
  title,
  isActive,
  onClick,
  className,
}) => {
  const classes = classNames(className || '', {
    'editor-action-button': true,
  })

  return (
    <Tooltip title={title} hoverDelay={50}>
      <Button
        className={classes}
        active={isActive}
        onClick={onClick}
        prefixMaterialIcon={icon}
        shape="circle"
        type="secondary"
        size="large"
      />
    </Tooltip>
  )
}
