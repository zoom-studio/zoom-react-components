import { useEffect, useRef, useState, type CSSProperties, useMemo } from 'react'
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
import { doByRef, sleep, useFutureEffect } from '@zoom-studio/zoom-js-ts-utils'
import { without } from 'lodash'

import { type SelectNS } from '.'
import { logs } from '../../constants'
import { type ZoomGlobalConfigProviderNS } from '../zoom-global-config-provider'
import { defaultEmpty, findDefaultValue } from './utils'
import { useZoomContext } from '../../hooks'

export namespace UseMacOSSelectNS {
  export interface Params<
    MultiSelect extends boolean = false,
    Value extends SelectNS.PossibleValues = number,
    Data = unknown,
  > extends Pick<
      SelectNS.Props<MultiSelect, Value, Data>,
      | 'onWillOpen'
      | 'onWillClose'
      | 'onChange'
      | 'onWrite'
      | 'multiSelect'
      | 'options'
      | 'showSearch'
      | 'defaultValue'
    > {
    sendLog: ZoomGlobalConfigProviderNS.Log
  }
}

export const useMacOSSelect = <
  MultiSelect extends boolean = false,
  Value extends SelectNS.PossibleValues = number,
  Data = unknown,
>({
  multiSelect,
  options,
  showSearch,
  onWillClose,
  onWillOpen,
  onChange,
  onWrite,
  sendLog,
  defaultValue,
}: UseMacOSSelectNS.Params<MultiSelect, Value, Data>) => {
  const { isRTL } = useZoomContext()

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

  const handleSetEmptyList = async () => {
    await sleep(20)
    const { current: scrollSection } = scrollRef
    if (!scrollSection) {
      if (open && showSearch) {
        sendLog(logs.selectNotFoundScrollRef, 'handleSetEmptyList function')
        return
      }
      return
    }

    const optionElements = scrollSection.querySelector('.option')
    const groupOptionElements = scrollSection.querySelector('.group-option')

    setEmptyState(
      optionElements || groupOptionElements
        ? false
        : options.length > 0
        ? 'nothing-found'
        : 'empty-list',
    )
  }

  const customizedOptions = useMemo<SelectNS.CustomizedOption<Value, Data>[]>(() => {
    const opts: SelectNS.CustomizedOption<Value, Data>[] = []

    options.forEach(option => {
      if (option.groupOptions && option.groupTitle) {
        opts.push(option)
        option.groupOptions.forEach(childOption => {
          opts.push({ ...childOption, isChildOption: true })
        })
      } else {
        opts.push(option)
      }
    })

    void handleSetEmptyList()
    return opts
  }, [options])

  const [selectedIndexes, setSelectedIndexes] = useState<number[]>(
    findDefaultValue(customizedOptions, defaultValue),
  )

  const [fallback, setFallback] = useState(false)
  const [innerOffset, setInnerOffset] = useState(0)
  const [touch, setTouch] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [blockSelection, setBlockSelection] = useState(false)
  const [emptyState, setEmptyState] = useState<SelectNS.EmptyState>(defaultEmpty(options))

  if (!open) {
    if (innerOffset !== 0) setInnerOffset(0)
    if (fallback) setFallback(false)
    if (blockSelection) setBlockSelection(false)
  }

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    placement: 'bottom-start',
    open,
    onOpenChange: isOpen => {
      if (isOpen) {
        onWillOpen?.()
      } else {
        onWillClose?.()
      }

      setOpen(isOpen)
    },
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
      onWillClose?.()
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

  const createItemProps = (index: number, selectable = true) => {
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

        if (allowSelectRef.current && selectable) {
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
          optionsParent.style.transform = `translateX(${isRTL ? '-' : ''}${
            `${labelWidth}px` ?? '0px'
          })`
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

  useFutureEffect(() => {
    if (onWrite || onChange) {
      const selectedOptions = selectedIndexes.map(index => customizedOptions[index])

      if (multiSelect) {
        // @ts-expect-error
        onWrite?.(selectedOptions.map(opt => opt.value))
        // @ts-expect-error
        onChange?.(selectedOptions)
      } else {
        // @ts-expect-error
        onWrite?.(selectedOptions[0].value)
        // @ts-expect-error
        onChange?.(selectedOptions[0])
      }
    }
  }, [selectedIndexes])

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
    handleSetEmptyList,
    customizedOptions,
    emptyState,
  }
}
