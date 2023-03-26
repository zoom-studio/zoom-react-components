import React, {
  CSSProperties,
  FormEvent,
  HTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

import { classNames, sleep } from '@zoom-studio/zoom-js-ts-utils'

import { Icon, Input, InputNS, Spin, SVGIcon, Text, TypographyNS } from '..'
import { BREAKPOINTS, logs } from '../../constants'
import { useComponentSize, useOutsideClick, useZoomComponent } from '../../hooks'
import { BaseComponent, CommonSize, DataEntriesState } from '../../types'
import { color } from '../../utils'
import { SelectGroup, SelectGroupNS } from './group'
import { SelectOption, SelectOptionNS } from './option'
import { defaultEmpty, focusSearchBox, groupOptions, scrollToTop } from './utils'
import { SelectValue } from './value'

export namespace SelectNS {
  export type EmptyState = 'nothing-found' | 'empty-list' | false

  export type Option<Values extends SelectOptionNS.Value> = SelectGroupNS.Props<Values> &
    SelectOptionNS.Props<Values>

  export type SingleOption = Pick<SelectOptionNS.Props<SelectOptionNS.Value>, 'value' | 'label'>

  export type SelectedOption = SelectOptionNS.Value | SelectGroupNS.GroupedSelectedOptions

  export type SingleSelectedOption<Values extends SelectOptionNS.Value> = [Values, Values?]

  export type SelectValue = Pick<Option<SelectOptionNS.Value>, 'label' | 'value'>

  export type SelectOptions = (
    currentOptions: SelectNS.GroupedOptions,
    selectedOptions: SelectNS.SelectedOption,
  ) => SelectNS.GroupedOptions

  export interface GroupedOptions {
    [value: SelectOptionNS.Value]: SelectGroupNS.GroupedProps
  }

  export interface Props<Values extends SelectOptionNS.Value> extends BaseComponent {
    options?: Option<Values>[]
    multiSelect?: boolean
    reference?: RefObject<HTMLDivElement>
    label?: string
    placeholder?: string
    stateMessageProps?: TypographyNS.TextNS.Props
    dropdownProps?: HTMLAttributes<HTMLDivElement>
    size?: CommonSize
    state?: DataEntriesState
    disabled?: boolean
    loading?: boolean
    labelColon?: boolean
    disabledOnLoading?: boolean
    optionsPerScroll?: number
    showSearch?: boolean
    childRef?: RefObject<HTMLDivElement>
    dropdownRef?: RefObject<HTMLDivElement>
    defaultIsOpen?: boolean
    searchInputProps?: InputNS.Props
    searchInputRef?: RefObject<HTMLInputElement>
    selectAllText?: string
    deselectAllText?: string
    searchQuery?: string
    nothingFoundText?: string
    emptyListText?: string
    scrollOnOpen?: boolean
    onChange?: (options: SingleOption[]) => void
    defaultValue?: Values | Values[]
    onWillOpen?: () => void
    onWillClose?: () => void
    onWrite?: (values: Values[]) => void
  }
}

export const Select = <Values extends SelectOptionNS.Value>({
  size: providedSize,
  options: providedOptions,
  childRef: providedChildRef,
  dropdownRef: providedDropdownRef,
  searchQuery: providedSearchQuery,
  labelColon = true,
  disabledOnLoading = true,
  showSearch = true,
  state = ['neutral'],
  optionsPerScroll = 6,
  selectAllText = 'انتخاب همه',
  deselectAllText = 'غیرفعال کردن همه',
  nothingFoundText = 'موردی مطابق با جستجو پیدا نشد',
  emptyListText = 'موردی وجود ندارد',
  scrollOnOpen = window.innerWidth <= BREAKPOINTS.md,
  className,
  searchInputRef,
  reference,
  containerProps,
  defaultIsOpen,
  defaultValue,
  disabled,
  dropdownProps,
  label,
  loading,
  multiSelect,
  onChange,
  onWillClose,
  onWillOpen,
  onWrite,
  placeholder,
  searchInputProps,
  stateMessageProps,
  ...rest
}: SelectNS.Props<Values>) => {
  const size = useComponentSize(providedSize)
  const { createClassName, sendLog } = useZoomComponent('select')

  const dropdownRef = providedDropdownRef ?? useRef<HTMLDivElement>(null)
  const inputRef = searchInputRef ?? useRef<HTMLInputElement>(null)
  const containerRef = reference ?? useRef<HTMLInputElement>(null)
  const optionsListRef = useRef<HTMLDivElement>(null)
  const childRef = providedChildRef ?? useRef<HTMLDivElement>(null)
  const selectedOptionRef = useRef<SelectNS.SingleSelectedOption<SelectOptionNS.Value> | null>(
    defaultValue ? ([defaultValue] as SelectNS.SingleSelectedOption<SelectOptionNS.Value>) : null,
  )

  const [searchQuery, setSearchQuery] = useState(providedSearchQuery || '')
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const [emptyState, setEmptyState] = useState<SelectNS.EmptyState>(defaultEmpty(providedOptions))
  const [options, setOptions] = useState<SelectNS.GroupedOptions>(
    groupOptions(providedOptions, defaultValue),
  )

  const isDisabled = disabledOnLoading ? loading || disabled : disabled
  const spinColor = state[0] === 'neutral' ? undefined : color({ source: state[0] })
  const textSizeProps: InputNS.TextSize = {
    small: size === 'small',
    normal: size === 'normal',
    large: size === 'large',
  }
  const listStyles: CSSProperties = {
    maxHeight: optionsPerScroll * 34 + 12,
  }

  const infoContainerClasses = classNames('info-container', { focus: isOpen })
  const dropdownClasses = createClassName(dropdownProps?.className, 'dropdown')
  const stateMessageClasses = createClassName(stateMessageProps?.className, 'state-message')
  const classes = createClassName(className, '', {
    [createClassName('', size)]: true,
    [createClassName('', 'open')]: !!isOpen,
    [createClassName('', state[0])]: true,
    [createClassName('', loading ? 'loading' : '')]: !!loading,
    [createClassName('', isDisabled ? 'disabled' : '')]: !!isDisabled,
  })

  const selectOptions: SelectNS.SelectOptions = (currentOptions, selectedOptions) => {
    const options = { ...currentOptions }
    const { current: prevSelectedOptions } = selectedOptionRef

    if (!multiSelect) {
      if (prevSelectedOptions) {
        if (prevSelectedOptions[1]) {
          options[prevSelectedOptions[0]].options![prevSelectedOptions[1]].selected = false
        } else {
          options[prevSelectedOptions[0]].selected = false
        }
      }
      close()
    }

    if (typeof selectedOptions === 'number' || typeof selectedOptions === 'string') {
      const newSelection = !options[selectedOptions].selected

      options[selectedOptions].selected = newSelection
      selectedOptionRef.current = [selectedOptions]
    } else {
      const parentValue = Object.keys(selectedOptions)[0]
      const childValues = selectedOptions[parentValue]
      const newSelection = !childValues.some(
        value => options[parentValue].options?.[value].selected,
      )

      selectedOptionRef.current = [parentValue, childValues[0]]
      childValues.forEach(childValue => {
        options[parentValue].options![childValue].selected = newSelection
      })
    }

    if (showSearch || emptyState !== false) {
      void focusSearchBox(inputRef, sendLog)
    }
    return options
  }

  const handleSelectOptions = (selectedOptions: SelectNS.SelectedOption) => {
    setOptions(options => selectOptions(options, selectedOptions))
  }

  const handleSetEmptyList = async () => {
    await sleep(20)
    const { current: optionsList } = optionsListRef
    if (!optionsList) {
      if (isOpen) {
        return sendLog(logs.selectNotFoundOptionsListRef, 'handleSetEmptyList function')
      }
      return
    }

    setEmptyState(
      optionsList.innerHTML
        ? false
        : (providedOptions || []).length > 0
        ? 'nothing-found'
        : 'empty-list',
    )
  }

  const onClose = () => {
    onWillClose?.()
  }

  const onOpen = () => {
    onWillOpen?.()
    scrollToTop(containerRef, scrollOnOpen, sendLog)

    if (showSearch || emptyState !== false) {
      void focusSearchBox(inputRef, sendLog)
    }

    void handleSetEmptyList()
  }

  const close = () => {
    setIsOpen(currentIsOpen => {
      if (currentIsOpen) {
        onClose()
      }
      return false
    })
  }

  const open = () => {
    if (isDisabled) {
      return
    }
    setIsOpen(currentIsOpen => {
      if (currentIsOpen) {
        onClose()
        return false
      }
      onOpen()
      return true
    })
  }

  const handleOnFilter = (evt: FormEvent<HTMLInputElement>) => {
    setSearchQuery(evt.currentTarget.value)
    void handleSetEmptyList()
  }

  const handleOnChange = (options: SelectNS.SingleOption[]) => {
    onChange?.(options)
    onWrite?.(options.map(option => option.value as Values))
  }

  useOutsideClick(close, childRef, dropdownRef)
  useEffect(() => setIsOpen(defaultIsOpen), [defaultIsOpen])
  useEffect(() => setSearchQuery(searchQuery || ''), [searchQuery])
  useEffect(() => {
    setOptions(groupOptions(providedOptions, defaultValue))
    void handleSetEmptyList()
  }, [providedOptions, defaultValue])

  return (
    <div {...rest} {...containerProps} className={classes} ref={containerRef}>
      <div className={infoContainerClasses} ref={childRef} onClick={open}>
        {loading && <Spin size="small" className="select-spin" color={spinColor} />}

        <Text common normal {...textSizeProps} className="select-label">
          {label && `${label}${labelColon ? ':' : ''}`}
        </Text>

        <SelectValue
          options={options}
          placeholder={placeholder}
          size={size}
          multiSelect={multiSelect}
          onChange={handleOnChange}
        />

        <Icon name="expand_more" className="expand-icon" />
      </div>

      {state[1] && (
        <Text {...textSizeProps} {...stateMessageProps} className={stateMessageClasses}>
          {state[1]}
        </Text>
      )}

      {isOpen && (
        <div {...dropdownProps} className={dropdownClasses} ref={dropdownRef}>
          {showSearch && emptyState !== 'empty-list' && (
            <div className="search-box">
              <Input
                placeholder="جستجو بین موارد..."
                {...searchInputProps}
                labelContainerProps={{ className: 'search-input-container' }}
                onInput={handleOnFilter}
                inputRef={inputRef}
                defaultValue={searchQuery}
              />
            </div>
          )}

          {emptyState && (
            <div className="empty-list">
              <SVGIcon
                name="empty-box"
                className="empty-list-icon"
                color={color => color({ source: 'text', tone: 3 })}
                size={40}
              />

              <Text common normal className="empty-list-message">
                {emptyState === 'empty-list' ? emptyListText : nothingFoundText}
              </Text>
            </div>
          )}

          <div className="options-list" style={listStyles} ref={optionsListRef}>
            {Object.values(options).map((option, index) =>
              option.options ? (
                <SelectGroup
                  {...option}
                  onSelect={value => handleSelectOptions(value)}
                  onSelectAll={values => handleSelectOptions(values)}
                  multiSelect={!!multiSelect}
                  selectAllText={selectAllText}
                  deselectAllText={deselectAllText}
                  searchQuery={searchQuery}
                  key={index}
                />
              ) : (
                <SelectOption
                  {...option}
                  onSelect={handleSelectOptions}
                  searchQuery={searchQuery}
                  key={index}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
