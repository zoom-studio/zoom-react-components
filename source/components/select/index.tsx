import React, { useState, type ReactNode } from 'react'

import { type MaybeArray, classNames, useFutureEffect } from '@zoom-studio/zoom-js-ts-utils'

import { Icon, Input, SVGIcon, Spin, Text, type InputNS, type TypographyNS } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import type { BaseComponent, CommonSize, DataEntriesState } from '../../types'
import { color } from '../../utils'

import { OptionsPortal } from './options-portal'
import { ScrollArrow } from './scroll-arrow'
import { SingleOption } from './single-option'
import { useMacOSSelect } from './use-mac-os-select'
import { SelectValue } from './value'

export namespace SelectNS {
  export type PossibleValues = string | number
  export type EmptyState = 'nothing-found' | 'empty-list' | false

  export interface Option<Value extends PossibleValues = number, Data = unknown> {
    value: Value
    label?: string | number
    disabled?: boolean
    data?: Data
    groupTitle?: string
    groupOptions?: Omit<Option<Value, Data>, 'groupTitle' | 'groupOptions'>[]
  }

  export interface CustomizedOption<Value extends PossibleValues = number, Data = unknown>
    extends Option<Value, Data> {
    isChildOption?: boolean
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
    defaultValue?: MaybeArray<Value | Option<Value, Data>>
    children: (option: Option<Value, Data>) => ReactNode
    renderSelectedOption?: (option: Option<Value, Data>) => ReactNode
    optionSearchModel?: (option: Option<Value, Data>) => string
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
  searchQuery: providedSearchQuery = '',
  labelColon = true,
  disabledOnLoading = true,
  showSearch = true,
  state = ['neutral'],
  nothingFoundText = 'موردی مطابق با جستجو پیدا نشد',
  emptyListText = 'موردی وجود ندارد',
  children = ({ value, label }) => <Text>{label ?? value}</Text>,
  renderSelectedOption = ({ value, label }) => <>{label ?? value}</>,
  optionSearchModel,
  searchPlaceholder,
  className,
  defaultValue,
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
  ...rest
}: SelectNS.Props<MultiSelect, Value, Data>) => {
  const [searchQuery, setSearchQuery] = useState(providedSearchQuery)

  const { createClassName, sendLog } = useZoomComponent('select')
  const size = useComponentSize(providedSize)
  const select = useMacOSSelect({
    onWillClose,
    onWillOpen,
    onChange,
    onWrite,
    sendLog,
    multiSelect,
    options,
    showSearch,
    defaultValue,
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

  const doesMatchQuery = (option: SelectNS.Option<Value, Data>): boolean => {
    const searchModel =
      typeof optionSearchModel === 'function'
        ? optionSearchModel(option).toLowerCase()
        : `${option.label} ${option.value} ${option.groupTitle}`.toLowerCase()

    return searchModel.includes(searchQuery.toLowerCase())
  }

  useFutureEffect(() => {
    void select.handleSetEmptyList()
  }, [searchQuery, providedSearchQuery])

  return (
    <>
      <div {...rest} {...containerProps} className={classes}>
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
            options={select.customizedOptions}
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
            {showSearch && select.emptyState !== 'empty-list' && (
              <div className="search-box">
                <Input
                  size="small"
                  changeStyleOnFocus={false}
                  placeholder={searchPlaceholder}
                  inputRef={select.searchInputRef}
                  value={searchQuery}
                  onWrite={setSearchQuery}
                />
              </div>
            )}

            {select.emptyState && (
              <div className="empty-list">
                <SVGIcon
                  name="empty-box"
                  className="empty-list-icon"
                  color={color => color({ source: 'text', tone: 3 })}
                  size={40}
                />

                <Text common normal className="empty-list-message">
                  {select.emptyState === 'empty-list' ? emptyListText : nothingFoundText}
                </Text>
              </div>
            )}

            {select.customizedOptions.map((option, index) =>
              doesMatchQuery(option) ? (
                <SingleOption
                  option={option}
                  key={index}
                  children={children}
                  index={index}
                  select={select}
                  isChildOption={option.isChildOption}
                />
              ) : (
                <></>
              ),
            )}
          </div>

          <ScrollArrow {...select.createScrollArrowProps('up')} />
          <ScrollArrow {...select.createScrollArrowProps('down')} />
        </div>
      </OptionsPortal>
    </>
  )
}
