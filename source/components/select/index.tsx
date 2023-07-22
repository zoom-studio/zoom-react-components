import React, { type ReactNode } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Icon, Input, Spin, Text, type InputNS, type TypographyNS } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import type { BaseComponent, CommonSize, DataEntriesState } from '../../types'
import { color } from '../../utils'

import { OptionsPortal } from './options-portal'
import { ScrollArrow } from './scroll-arrow'
import { useMacOSSelect } from './use-mac-os-select'
import { SelectValue } from './value'

export namespace SelectNS {
  export type PossibleValues = string | number

  export interface Option<Value extends PossibleValues = number, Data = unknown> {
    value: Value
    label?: string | number
    disabled?: boolean
    data?: Data
  }

  export interface Props<
    MultiSelect extends boolean = false,
    Value extends PossibleValues = number,
    Data = unknown,
  > extends Omit<BaseComponent, 'children'> {
    options: Option<Value, Data>[]
    size?: CommonSize
    label?: string
    multiSelect?: MultiSelect
    placeholder?: string
    stateMessageProps?: TypographyNS.TextNS.Props
    state?: DataEntriesState
    disabled?: boolean
    loading?: boolean
    labelColon?: boolean
    disabledOnLoading?: boolean
    showSearch?: boolean
    searchQuery?: string
    searchPlaceholder?: string
    nothingFoundText?: string
    emptyListText?: string
    children: (option: Option<Value, Data>) => ReactNode
    renderSelectedOption?: (option: Option<Value, Data>) => ReactNode
    onWillOpen?: () => void
    onWillClose?: () => void
    onWrite?: (values: MultiSelect extends true ? PossibleValues[] : PossibleValues) => void
    onChange?: (
      options: MultiSelect extends true ? Option<Value, Data>[] : Option<Value, Data>,
    ) => void
  }
}

export const Select = <
  MultiSelect extends boolean = false,
  Value extends SelectNS.PossibleValues = number,
  Data = unknown,
>({
  size: providedSize,
  searchQuery: providedSearchQuery,
  labelColon = true,
  disabledOnLoading = true,
  showSearch = true,
  state = ['neutral'],
  nothingFoundText = 'موردی مطابق با جستجو پیدا نشد',
  emptyListText = 'موردی وجود ندارد',
  children = ({ value, label }) => <Text>{label ?? value}</Text>,
  renderSelectedOption = ({ value, label }) => <>{label ?? value}</>,
  searchPlaceholder,
  className,
  containerProps,
  label,
  disabled,
  loading,
  multiSelect,
  placeholder,
  stateMessageProps,
  options,
  onChange,
  onWillClose,
  onWillOpen,
  onWrite,
}: SelectNS.Props<MultiSelect, Value, Data>) => {
  const { createClassName } = useZoomComponent('select')
  const size = useComponentSize(providedSize)
  const select = useMacOSSelect({
    multiSelect: !!multiSelect,
  })

  const isDisabled = disabledOnLoading ? loading || disabled : disabled
  const spinColor = state[0] === 'neutral' ? undefined : color({ source: state[0] })
  const contentClasses = classNames('content', { focus: select.open })
  const stateMessageClasses = createClassName(stateMessageProps?.className, 'state-message')
  const classes = createClassName(className, '', {
    [createClassName('', size)]: true,
    [createClassName('', state[0])]: true,
    [createClassName('', 'loading')]: !!loading,
    [createClassName('', 'disabled')]: !!isDisabled,
    [createClassName('', 'open')]: select.open,
  })
  const textSizeProps: InputNS.TextSize = {
    small: size === 'small',
    normal: size === 'normal',
    large: size === 'large',
  }

  const getOptionClasses = (option: SelectNS.Option<Value, Data>, index: number) => {
    return classNames('option', {
      active: select.selectedIndexes.includes(index),
    })
  }

  const renderOptionContent = (option: SelectNS.Option<Value, Data>): ReactNode => {
    const content = children(option)
    if (typeof content === 'string') {
      return <Text>{content}</Text>
    }
    return content
  }

  return (
    <>
      <div className={classes} {...containerProps}>
        <div
          className={contentClasses}
          ref={select.refs.setReference}
          {...select.createReferenceProps()}
        >
          {loading && <Spin size="small" className="select-spin" color={spinColor} />}

          <Text common normal ref={select.labelRef} {...textSizeProps} className="select-label">
            {label && `${label}${labelColon ? ':' : ''}`}
          </Text>

          <SelectValue
            textSizeProps={textSizeProps}
            multiSelect={!!multiSelect}
            placeholder={placeholder}
            select={select}
            renderSelectedOption={renderSelectedOption}
            options={options}
          />

          <Icon name="expand_more" className="expand-icon" />
        </div>

        {state[1] && (
          <Text {...textSizeProps} {...stateMessageProps} className={stateMessageClasses}>
            {state[1]}
          </Text>
        )}
      </div>

      <OptionsPortal select={select} size={size} showSearch={showSearch}>
        <div ref={select.refs.setFloating} style={{ ...select.floatingStyles, outline: '0' }}>
          <div
            className="options-container"
            ref={select.scrollRef}
            {...select.createFloatingProps()}
          >
            <div className="search-box">
              <Input
                size="small"
                changeStyleOnFocus={false}
                placeholder={searchPlaceholder}
                inputRef={select.searchInputRef}
              />
            </div>

            {options.map((option, index) => (
              <div
                {...select.createItemProps(index)}
                key={option.value}
                data-disabled={select.blockSelection}
                className={getOptionClasses(option, index)}
                ref={node => {
                  select.listRef.current[index] = node
                  select.listContentRef.current[index] = option.value.toString()
                }}
              >
                {renderOptionContent(option)}
              </div>
            ))}
          </div>

          <ScrollArrow {...select.createScrollArrowProps('up')} />
          <ScrollArrow {...select.createScrollArrowProps('down')} />
        </div>
      </OptionsPortal>
    </>
  )
}
