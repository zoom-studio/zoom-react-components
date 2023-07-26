import { type MutableRefObject } from 'react'

import { type SelectNS } from '.'
import { type ScrollArrowNS } from './scroll-arrow'
import { findIndex, isArray } from 'lodash'

export const SCROLL_ARROW_PADDING = 10

export const shouldShowArrow = (
  scrollRef: MutableRefObject<HTMLDivElement | null>,
  dir: ScrollArrowNS.ArrowDir,
) => {
  if (scrollRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current

    if (dir === 'up') {
      return scrollTop >= SCROLL_ARROW_PADDING
    }

    if (dir === 'down') {
      return scrollTop <= scrollHeight - clientHeight - SCROLL_ARROW_PADDING
    }
  }

  return false
}

export const defaultEmpty = <Value extends SelectNS.PossibleValues = number, Data = unknown>(
  options: SelectNS.Option<Value, Data>[] = [],
): SelectNS.EmptyState => {
  return options.length === 0 ? 'empty-list' : false
}

export const findDefaultValue = <
  MultiSelect extends boolean = false,
  Value extends SelectNS.PossibleValues = number,
  Data = unknown,
>(
  options: SelectNS.CustomizedOption<Value, Data>[],
  defaultValue?: SelectNS.Props<MultiSelect, Value, Data>['defaultValue'],
): number[] => {
  if (!defaultValue) {
    return []
  }

  defaultValue = isArray(defaultValue) ? defaultValue : [defaultValue]

  const values: number[] = []

  defaultValue.forEach(item => {
    const value = typeof item === 'object' ? item.value : item
    const index = findIndex(options, option => option.value === value)

    if (index >= 0) {
      values.push(index)
    }
  })

  return values
}
