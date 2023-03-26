import React, { FC, HTMLAttributes, ReactNode, useRef } from 'react'

import { SpinNS, TypographyNS } from '..'
import { BaseComponent } from '../../types'

import { PopoverContent } from './popover-content'
import { PopoverTrigger } from './popover-triggre'
import { usePopover } from './use-popover'
import { PopoverContext } from './use-popover-context'

export namespace PopoverNS {
  export const Trigger = ['click', 'focus', 'hover'] as const
  export type Trigger = typeof Trigger[number]

  export type Placement = typeof Placement[number]
  const Placement = [
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'left-start',
    'left',
    'left-end',
  ] as const

  export interface Handlers {
    openPopover: () => void
    closePopover: () => void
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    title?: string | ReactNode
    content?: ReactNode | ((handlers: Handlers) => ReactNode)
    description?: string
    trigger?: Trigger
    loading?: boolean
    placement?: Placement
    showArrow?: boolean
    spinProps?: SpinNS.Props
    defaultIsOpen?: boolean
    hoverDelay?: number
    width?: string | number
    autoCloseDelay?: number
    children?: JSX.Element | ((handlers: Handlers) => JSX.Element)
    isOpen?: boolean
    titleProps?: TypographyNS.TitleNS.Props
    contentProps?: HTMLAttributes<HTMLDivElement>
    popoverProps?: HTMLAttributes<HTMLDivElement>
    descriptionProps?: TypographyNS.TextNS.Props
    onOpen?: () => void
    onClose?: () => void
    onOpenChange?: (isOpen: boolean) => void
  }
}

export const Popover: FC<PopoverNS.Props> = ({
  trigger = 'hover',
  placement = 'top',
  showArrow = true,
  ...props
}) => {
  const allProps = { ...props, trigger, placement, showArrow }
  const arrowRef = useRef<SVGSVGElement | null>(null)
  const popover = usePopover({ ...allProps, arrowRef })

  return (
    <PopoverContext.Provider value={popover}>
      <PopoverContent
        {...allProps}
        arrowRef={arrowRef}
        close={popover.close}
        open={popover.open}
        toggle={popover.toggle}
      />
      <PopoverTrigger
        {...allProps}
        close={popover.close}
        open={popover.open}
        toggle={popover.toggle}
      />
    </PopoverContext.Provider>
  )
}
