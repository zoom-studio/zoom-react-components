import React, { type ReactNode } from 'react'

import { classNames } from '@zoom-studio/js-ts-utils'

import { type SelectNS } from '.'
import { type InputNS, Text, Title } from '..'
import { type useMacOSSelect } from './use-mac-os-select'

export namespace SingleOptionNS {
  export interface Props<Value extends SelectNS.PossibleValues = number, Data = unknown>
    extends Required<Pick<SelectNS.Props<true, Value, Data>, 'children'>> {
    option: SelectNS.Option<Value, Data>
    select: ReturnType<typeof useMacOSSelect>
    index: number
    isChildOption?: boolean
    textSizeProps: InputNS.TextSize
  }
}

export const SingleOption = <Value extends SelectNS.PossibleValues = number, Data = unknown>({
  option,
  select,
  index,
  children,
  isChildOption,
  textSizeProps,
}: SingleOptionNS.Props<Value, Data>) => {
  const isGroupTitle = !!option.groupOptions && !!option.groupTitle

  const optionClasses = classNames('option', {
    'active': select.selectedIndexes.includes(index),
    'child-option': !!isChildOption,
    'disabled': !!option.disabled,
  })

  const renderOptionContent = (option: SelectNS.Option<Value, Data>): ReactNode => {
    const content = children(option)
    if (typeof content === 'string') {
      return <Text {...textSizeProps}>{content}</Text>
    }
    return content
  }

  return isGroupTitle ? (
    <div
      className="group-option"
      ref={node => {
        select.listRef.current[index] = node
        select.listContentRef.current[index] = option.value.toString()
      }}
    >
      <Title h5 className="group-title">
        {option.groupTitle}
      </Title>
    </div>
  ) : (
    <div
      {...select.createItemProps(index, !option.disabled)}
      key={option.value}
      data-disabled={select.blockSelection}
      className={optionClasses}
      ref={node => {
        select.listRef.current[index] = node
        select.listContentRef.current[index] = option.value.toString()
      }}
    >
      {renderOptionContent(option)}
    </div>
  )
}
