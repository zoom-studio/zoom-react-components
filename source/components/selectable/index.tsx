import React, { cloneElement, FC, MouseEvent, useMemo, useState } from 'react'

import { createSelectable, ReactSelectableComponentProps, SelectableGroup } from 'react-selectable'

import { useFutureEffect, useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace SelectableNS {
  export interface ChildrenCallbackParams<DataType extends unknown[]> {
    data: DataType[0]
    isSelected: boolean
    select: (evt: MouseEvent) => void
    deselect: () => void
  }

  export interface Props<ItemComponentProps extends object, DataType extends unknown[]>
    extends Omit<BaseComponent, 'reference' | 'children'> {
    itemComponent: FC<ItemComponentProps>
    disabled?: boolean
    tolerance?: number
    dataset?: DataType
    deselectOnOutsideClick?: boolean
    multiSelect?: boolean
    defaultSelections?: number[]
    onSelect?: (selectedIndexes: number[]) => void
    children: (
      SelectableComponent: FC<ItemComponentProps>,
      params: ChildrenCallbackParams<DataType>,
    ) => JSX.Element
  }
}

export const Selectable = <ItemComponentProps extends object, DataType extends unknown[]>({
  deselectOnOutsideClick = true,
  tolerance = 0,
  multiSelect = true,
  defaultSelections = [],
  className,
  containerProps,
  itemComponent,
  disabled,
  dataset,
  children,
  onSelect,
  ...rest
}: SelectableNS.Props<ItemComponentProps, DataType>) => {
  const ItemComponent = useMemo(() => createSelectable(itemComponent), [])
  const { createClassName } = useZoomComponent('selectable')

  const [selectedItems, setSelectedItems] = useState<number[]>(defaultSelections)

  const classes = createClassName(className)

  const handleOnSelection = (selectedIndexes: number[]) => {
    setSelectedItems(selectedIndexes)
  }

  const handleSelectSingleIndex = (index: number) => {
    if (disabled) {
      return
    }

    setSelectedItems(currentSelectedItems => {
      return currentSelectedItems.length === 1 && currentSelectedItems[0] === index ? [] : [index]
    })
  }

  const handleAppendSingleIndex = (index: number) => {
    if (disabled) {
      return
    }

    setSelectedItems(currentSelectedItems => {
      if (currentSelectedItems.includes(index)) {
        return currentSelectedItems.filter(selectedItem => selectedItem !== index)
      }
      return [...currentSelectedItems, index]
    })
  }

  const handleShiftilySelectIndex = (index: number) => {
    if (disabled) {
      return
    }

    if (selectedItems.length === 0) {
      handleSelectSingleIndex(index)
    } else {
      const biggestSelectionIndex = Math.max(...selectedItems)
      let fromIndex = biggestSelectionIndex
      let toIndex = index

      if (toIndex < fromIndex) {
        const to = toIndex
        toIndex = fromIndex
        fromIndex = to
      }

      const newSelections = Array.from(Array(toIndex - fromIndex + 1)).map(
        (_, index) => index + fromIndex,
      )

      setSelectedItems(newSelections)
    }
  }

  const handleSelectItems = (clickedItemIndex: number) => (evt?: MouseEvent) => {
    if (disabled) {
      return
    }

    if (multiSelect && evt) {
      if (evt.ctrlKey) {
        handleAppendSingleIndex(clickedItemIndex)
      } else if (evt.shiftKey) {
        handleShiftilySelectIndex(clickedItemIndex)
      } else {
        handleSelectSingleIndex(clickedItemIndex)
      }
    } else {
      handleSelectSingleIndex(clickedItemIndex)
    }
  }

  const handleDeselectItems = (clickedItemIndex: number) => () => {
    setSelectedItems(currentSelectedItems =>
      currentSelectedItems.filter(index => clickedItemIndex !== index),
    )
  }

  const handleRenderChildren = (data: DataType[0], index: number): JSX.Element => {
    const isSelected = selectedItems.includes(index)

    return cloneElement<ReactSelectableComponentProps>(
      children(ItemComponent as any, {
        data,
        isSelected,
        select: handleSelectItems(index),
        deselect: handleDeselectItems(index),
      }),
      {
        selectableKey: index,
        key: index,
        selected: isSelected,
      },
    )
  }

  const handleOnOutsideClick = () => {
    if (disabled) {
      return
    }

    if (deselectOnOutsideClick) {
      setSelectedItems([])
    }
  }

  useFutureEffect(() => {
    onSelect?.(selectedItems)
  }, [selectedItems])

  return (
    <SelectableGroup
      {...rest}
      {...containerProps}
      className={classes}
      enabled={!disabled && multiSelect}
      onSelection={handleOnSelection}
      onNonItemClick={handleOnOutsideClick}
      tolerance={tolerance}
    >
      {dataset?.map(handleRenderChildren)}
    </SelectableGroup>
  )
}
