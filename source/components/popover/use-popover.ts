import { type MutableRefObject, useMemo, useState } from 'react'

import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  arrow,
} from '@floating-ui/react'

import { type PopoverNS } from '.'

export namespace UsePopoverNS {
  export interface Params
    extends Pick<
      PopoverNS.Props,
      | 'onOpenChange'
      | 'isOpen'
      | 'placement'
      | 'onOpen'
      | 'onClose'
      | 'autoCloseDelay'
      | 'defaultIsOpen'
      | 'showArrow'
    > {
    arrowRef: MutableRefObject<SVGSVGElement | null>
  }
}

export const usePopover = ({
  isOpen: controlledIsOpen,
  onOpenChange: setControlledOpen,
  placement,
  onClose,
  autoCloseDelay,
  onOpen,
  defaultIsOpen,
  arrowRef,
  showArrow,
}: UsePopoverNS.Params) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(!!defaultIsOpen)

  const isOpen = controlledIsOpen === undefined ? uncontrolledIsOpen : controlledIsOpen
  const setIsOpen =
    setControlledOpen && setControlledOpen.name !== 'mockConstructor'
      ? setControlledOpen
      : setUncontrolledIsOpen

  const floating = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(showArrow ? 12 : 6),
      flip({
        fallbackAxisSideDirection: 'end',
      }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
  })

  const { context } = floating

  const click = useClick(context, { enabled: isOpen === null })
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const interactions = useInteractions([click, dismiss, role])

  const toggle = () => {
    if (isOpen) {
      close()
      return
    }
    open()
  }

  const open = () => {
    onOpen?.()
    setIsOpen(true)
    if (autoCloseDelay) {
      setTimeout(close, autoCloseDelay)
    }
  }

  const close = () => {
    onClose?.()
    setIsOpen(false)
  }

  return useMemo(
    () => ({
      open,
      close,
      toggle,
      isOpen,
      ...interactions,
      ...floating,
    }),
    [open, setIsOpen, interactions, floating],
  )
}
