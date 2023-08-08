import { useRef, useState, type KeyboardEvent } from 'react'

import {
  autoUpdate,
  flip,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react'
import { useVariable } from '@zoom-studio/js-ts-utils'

export namespace UseComboBoxNS {
  export interface Params {
    comboBoxData?: string[]
    inputValue?: string
    setValue: (value: string) => void
    isComboBox: boolean
  }
}

export const useComboBox = ({
  comboBoxData,
  setValue,
  inputValue,
  isComboBox,
}: UseComboBoxNS.Params) => {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const listRef = useRef<(HTMLElement | null)[]>([])

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip({ padding: 10 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          })
        },
        padding: 10,
      }),
    ],
  })

  const role = useRole(context, { role: 'listbox' })
  const dismiss = useDismiss(context)

  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    role,
    dismiss,
    listNav,
  ])

  const handleComboBoxOnWrite = (value: string) => {
    if (value) {
      setOpen(true)
      setActiveIndex(0)
    } else {
      setOpen(false)
    }
  }

  const items = useVariable<string[]>(() => {
    if (!isComboBox || (comboBoxData ?? [])?.length <= 0 || !inputValue) {
      return []
    }
    const displayableItems = comboBoxData?.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase()),
    )

    return displayableItems ?? []
  })

  const handleComboBoxOnKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && activeIndex != null && items[activeIndex]) {
      setValue(items[activeIndex])
      setActiveIndex(null)
      setOpen(false)
    }
  }

  return {
    open,
    refs,
    context,
    floatingStyles,
    listRef,
    activeIndex,
    items,
    setOpen,
    getItemProps,
    getReferenceProps,
    handleComboBoxOnWrite,
    handleComboBoxOnKeyDown,
    getFloatingProps,
  }
}
