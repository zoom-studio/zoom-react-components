import React, { forwardRef } from 'react'

import { Popover, type PopoverNS } from '../popover'

export namespace TooltipNS {
  export interface Props extends Pick<PopoverNS.Props, 'placement' | 'hoverDelay'> {
    title: string
    children?: PopoverNS.Props['children']
  }
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipNS.Props>(
  ({ hoverDelay = 800, title, children, ...popoverProps }, reference) => {
    return (
      <Popover
        ref={reference}
        description={title}
        trigger="hover"
        hoverDelay={hoverDelay}
        {...popoverProps}
      >
        {children}
      </Popover>
    )
  },
)
