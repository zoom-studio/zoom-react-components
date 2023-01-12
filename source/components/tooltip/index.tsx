import React, { FC, ReactNode } from 'react'

import { Popover, PopoverNS } from '../popover'

export namespace TooltipNS {
  export interface Props extends Pick<PopoverNS.Props, 'placement' | 'hoverDelay'> {
    title: string
    children?: ReactNode
  }
}

export const Tooltip: FC<TooltipNS.Props> = ({
  hoverDelay = 800,
  title,
  children,
  ...popoverProps
}) => {
  return (
    <Popover description={title} trigger="hover" hoverDelay={hoverDelay} {...popoverProps}>
      {children}
    </Popover>
  )
}
