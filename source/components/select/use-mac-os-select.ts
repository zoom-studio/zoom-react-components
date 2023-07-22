import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'

import {
  autoUpdate,
  flip,
  inner,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInnerOffset,
  useInteractions,
  useRole,
  type SideObject,
} from '@floating-ui/react'
import { doByRef } from '@zoom-studio/zoom-js-ts-utils'
import { without } from 'lodash'

export namespace UseMacOSSelectNS {
  export interface Params {
    multiSelect: boolean
  }
}

export const useMacOSSelect = ({ multiSelect }: UseMacOSSelectNS.Params) => {
  const listRef = useRef<Array<HTMLElement | null>>([])
  const listContentRef = useRef<Array<string | null>>([])
  const overflowRef = useRef<SideObject>(null)
  const allowSelectRef = useRef(false)
  const allowMouseUpRef = useRef(true)
  const selectTimeoutRef = useRef<any>()
  const scrollRef = useRef<HTMLDivElement>(null)
  const valuesContainerRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const floatingOverlayRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const [fallback, setFallback] = useState(false)
  const [innerOffset, setInnerOffset] = useState(0)
  const [touch, setTouch] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [blockSelection, setBlockSelection] = useState(false)

  if (!open) {
    if (innerOffset !== 0) setInnerOffset(0)
    if (fallback) setFallback(false)
    if (blockSelection) setBlockSelection(false)
  }

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    placement: 'bottom-start',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    transform: false,
    middleware: fallback
      ? [
          offset(5),
          touch ? shift({ crossAxis: true, padding: 10 }) : flip({ padding: 10 }),
          size({
            apply({ availableHeight }) {
              Object.assign(scrollRef.current?.style ?? {}, {
                maxHeight: `${availableHeight}px`,
              })
            },
            padding: 10,
          }),
        ]
      : [
          inner({
            listRef,
            overflowRef,
            scrollRef,
            index: selectedIndexes[0],
            offset: innerOffset,
            onFallbackChange: setFallback,
            padding: 10,
            minItemsVisible: touch ? 8 : 4,
            referenceOverflowThreshold: 20,
          }),
          offset({ crossAxis: -4 }),
        ],
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, { event: 'mousedown' }),
    useDismiss(context),
    useRole(context, { role: 'listbox' }),
    useInnerOffset(context, {
      enabled: !fallback,
      onChange: setInnerOffset,
      overflowRef,
      scrollRef,
    }),
  ])

  const handleArrowScroll = (amount: number) => {
    if (fallback) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop -= amount
        flushSync(() => {
          setScrollTop(scrollRef.current?.scrollTop ?? 0)
        })
      }
    } else {
      flushSync(() => {
        setInnerOffset(value => value - amount)
      })
    }
  }

  const handleArrowHide = () => {
    if (touch) {
      clearTimeout(selectTimeoutRef.current)
      setBlockSelection(true)
      selectTimeoutRef.current = setTimeout(() => {
        setBlockSelection(false)
      }, 400)
    }
  }

  const selectOption = (index: number) => {
    if (!multiSelect) {
      setSelectedIndexes([index])
      setOpen(false)
    } else {
      setSelectedIndexes(indexes => {
        if (indexes.includes(index)) {
          return without(indexes, index)
        }
        const newIndexes = [...indexes]
        newIndexes.push(index)
        return newIndexes
      })
      searchInputRef.current?.focus()
    }
  }

  const createItemProps = (index: number) => {
    return getItemProps({
      onTouchStart: () => {
        allowSelectRef.current = true
        allowMouseUpRef.current = false
      },
      onKeyDown: () => {
        allowSelectRef.current = true
      },
      onMouseUp: () => {
        if (!allowMouseUpRef.current) {
          return
        }

        if (allowSelectRef.current) {
          selectOption(index)
        }

        clearTimeout(selectTimeoutRef.current)
        selectTimeoutRef.current = setTimeout(() => {
          allowSelectRef.current = true
        })
      },
    })
  }

  const createReferenceProps = () => {
    return getReferenceProps({
      onTouchStart: () => {
        setTouch(true)
      },
      onPointerMove({ pointerType }) {
        if (pointerType !== 'touch') {
          setTouch(false)
        }
      },
    })
  }

  const createFloatingProps = () => {
    const props = getFloatingProps({
      onScroll({ currentTarget }) {
        flushSync(() => {
          setScrollTop(currentTarget.scrollTop)
        })
      },
      onContextMenu(e) {
        e.preventDefault()
      },
    })

    const style: CSSProperties = {
      ...(props.style ?? {}),
    }

    doByRef(valuesContainerRef, valuesContainer => {
      style.width = getComputedStyle(valuesContainer).width ?? '160px'
    })

    doByRef(floatingOverlayRef, floatingOverlay => {
      const optionsParent = floatingOverlay.querySelector('div')
      if (optionsParent) {
        doByRef(labelRef, label => {
          const labelWidth = (parseFloat(getComputedStyle(label).width) ?? 0) + 16
          optionsParent.style.transform = `translateX(-${`${labelWidth}px` ?? '0px'})`
        })
      }
    })

    return { ...props, style }
  }

  const createScrollArrowProps = (dir: 'up' | 'down') => {
    return {
      key: dir,
      dir,
      scrollTop,
      scrollRef,
      innerOffset,
      isPositioned,
      onScroll: handleArrowScroll,
      onHide: handleArrowHide,
    }
  }

  useEffect(() => {
    if (open) {
      selectTimeoutRef.current = setTimeout(() => {
        allowSelectRef.current = true
      }, 300)

      return () => {
        clearTimeout(selectTimeoutRef.current)
      }
    } else {
      allowSelectRef.current = false
      allowMouseUpRef.current = true
    }
  }, [open])

  return {
    listRef,
    listContentRef,
    createReferenceProps,
    scrollRef,
    selectedIndexes,
    refs,
    open,
    touch,
    createFloatingProps,
    context,
    floatingStyles,
    blockSelection,
    innerOffset,
    isPositioned,
    handleArrowScroll,
    handleArrowHide,
    scrollTop,
    createItemProps,
    createScrollArrowProps,
    valuesContainerRef,
    labelRef,
    floatingOverlayRef,
    searchInputRef,
  }
}
