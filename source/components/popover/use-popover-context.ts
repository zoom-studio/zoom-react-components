import { createContext, useContext } from 'react'

import { usePopover } from './use-popover'

export namespace UsePopoverContextNS {
  export type ContextType = ReturnType<typeof usePopover> | null
}

export const PopoverContext = createContext<UsePopoverContextNS.ContextType>(null)

export const usePopoverContext = () => {
  const context = useContext(PopoverContext)

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }

  return context
}
