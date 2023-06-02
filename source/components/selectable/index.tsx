import React, { cloneElement, useState, type FC } from 'react'

import SelectionArea, { type SelectionEvent } from '@viselect/react'
import { classNames, useFutureEffect } from '@zoom-studio/zoom-js-ts-utils'

import { ConditionalWrapper } from '..'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace SelectableNS {
  export const KEY = 'data-key'
  export const CLASSNAMES = {
    SELECTED: 'ZOOMRC-SELECTABLE-SELECTED-ITEM',
    SELECTABLE: 'ZOOMRC-SELECTABLE-SELECTABLE-ITEM',
  }

  export interface ChildrenItemProps {
    [KEY]: number
    className: string
  }

  export interface ChildrenCallbackParams<DataType extends unknown[]> {
    data: DataType[0]
    isSelected: boolean
    index: number
    props: ChildrenItemProps
    select: () => void
  }

  export interface Props<ItemComponentProps extends object, DataType extends unknown[]>
    extends Omit<BaseComponent, 'reference' | 'children'> {
    itemComponent: FC<ItemComponentProps>
    disabled?: boolean
    dataset?: DataType
    multiSelect?: boolean
    defaultSelections?: Set<number>
    onSelect?: (selectedIndexes: number[]) => void
    children: (
      SelectableComponent: FC<ItemComponentProps>,
      params: ChildrenCallbackParams<DataType>,
    ) => JSX.Element
  }
}

export const Selectable = <ItemComponentProps extends object, DataType extends unknown[]>({
  multiSelect = true,
  defaultSelections = new Set(),
  className,
  containerProps,
  itemComponent,
  disabled,
  dataset,
  children,
  onSelect,
  ...rest
}: SelectableNS.Props<ItemComponentProps, DataType>) => {
  const { createClassName } = useZoomComponent('selectable')
  const [selected, setSelected] = useState<Set<number>>(defaultSelections)

  const classes = createClassName(className)

  const extractIds = (elements: Element[]): number[] => {
    return elements
      .map(element => element.getAttribute(SelectableNS.KEY))
      .filter(Boolean)
      .map(Number)
  }

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection()
      setSelected(() => new Set())
    }
  }

  const handleSingleSelect = (itemIndex: number) => () => {
    if (!multiSelect) {
      setSelected(currentSelection => {
        return currentSelection.has(itemIndex) ? new Set() : new Set([itemIndex])
      })
    }
  }

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    setSelected(prev => {
      const next = new Set(prev)
      extractIds(added).forEach(id => next.add(id))
      extractIds(removed).forEach(id => next.delete(id))
      return next
    })
  }

  const getItemsClassNames = (isSelected: boolean): string => {
    return classNames(SelectableNS.CLASSNAMES.SELECTABLE, {
      [SelectableNS.CLASSNAMES.SELECTED]: isSelected,
    })
  }

  const handleRenderChildren = (data: DataType[0], index: number): JSX.Element => {
    const isSelected = selected.has(index)

    return cloneElement(
      children(itemComponent, {
        data,
        index,
        isSelected,
        select: handleSingleSelect(index),
        props: {
          className: getItemsClassNames(isSelected),
          [SelectableNS.KEY]: index,
        },
      }),
      { selected: isSelected, key: index },
    )
  }

  useFutureEffect(() => {
    onSelect?.([...selected])
  }, [selected])

  return (
    <ConditionalWrapper
      condition={disabled || !multiSelect}
      trueWrapper={child => (
        <div {...containerProps} {...rest} className={classes}>
          {child}
        </div>
      )}
      falseWrapper={child => (
        <SelectionArea
          {...containerProps}
          {...rest}
          className={classes}
          onStart={onStart}
          onMove={onMove}
          selectables={`.${SelectableNS.CLASSNAMES.SELECTABLE}`}
          // features={{
          //   range: false,
          //   touch: true,
          //   singleTap: {
          //     allow: true,
          //     intersect: 'native',
          //   },
          // }}
        >
          {child}
        </SelectionArea>
      )}
    >
      {dataset?.map(handleRenderChildren)}
    </ConditionalWrapper>
  )
}
