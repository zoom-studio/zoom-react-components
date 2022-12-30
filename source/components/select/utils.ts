import { RefObject } from 'react'

import { sleep } from '@zoom-studio/zoom-js-ts-utils'

import { SelectNS } from '.'

export const groupOptions = (options?: SelectNS.Option[]): SelectNS.GroupedOptions => {
  const groupedOptions: SelectNS.GroupedOptions = {}

  options?.forEach(option => {
    if (option.options) {
      const groupedChild: SelectNS.GroupedOptions = {}
      option.options.forEach(childOption => {
        groupedChild[childOption.value] = childOption
      })
      groupedOptions[option.value] = { ...option, options: groupedChild }
    } else {
      groupedOptions[option.value] = { ...option, options: undefined }
    }
  })
  return groupedOptions
}

export const getSelectedOptions = (
  currentOptions?: SelectNS.GroupedOptions,
): SelectNS.SingleOption[] => {
  const selectedOptions: SelectNS.SingleOption[] = []
  if (!currentOptions) {
    return selectedOptions
  }

  const options = Object.values(currentOptions)

  for (const option of options) {
    if (option.selected) {
      selectedOptions.push({
        label: option.label,
        value: option.value,
      })
    }

    if (option.options) {
      const childOptions = Object.values(option.options)
      for (const childOption of childOptions) {
        if (childOption.selected) {
          selectedOptions.push({
            label: childOption.label,
            value: childOption.value,
          })
        }
      }
    }
  }

  return selectedOptions
}

export const scrollToTop = (containerRef: RefObject<HTMLDivElement>, scrollOnOpen?: boolean) => {
  const { current: container } = containerRef
  if (!container || !scrollOnOpen) {
    return null
  }
  window.scrollTo({ top: container.offsetTop - 20 })
}

export const focusSearchBox = async (inputRef: RefObject<HTMLInputElement>) => {
  await sleep(2)
  const { current: searchBox } = inputRef
  if (searchBox) {
    searchBox.focus()
  }
}

export const defaultEmpty = (options?: SelectNS.Option[]) => {
  return (options || []).length === 0 ? 'empty-list' : false
}

export const filterLabel = (label: string, searchQuery: string): boolean => {
  label = label.toLowerCase().trim()
  searchQuery = searchQuery.toLowerCase().trim()
  return label.includes(searchQuery)
}
