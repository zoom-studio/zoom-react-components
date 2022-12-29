import React, {
  CSSProperties,
  FC,
  FormEvent,
  HTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

import { sleep } from '@zoom-studio/zoom-js-ts-utils'

import { Icon, Input, InputNS, Spin, SVGIcon, Text, TypographyNS } from '..'
import { BREAKPOINTS } from '../../constants'
import { useOutsideClick, useZoomComponent } from '../../hooks'
import { color } from '../../utils'
import { SelectGroup, SelectGroupNS } from './group'
import { SelectOption, SelectOptionNS } from './option'
import { SelectValue } from './value'
import { defaultEmpty, focusSearchBox, groupOptions, scrollToTop } from './utils'

export namespace SelectNS {
  export type EmptyState = 'nothing-found' | 'empty-list' | false
  export type Size = 'small' | 'normal' | 'large'
  export type Option = SelectGroupNS.Props & SelectOptionNS.Props
  export type SingleOption = Array<Pick<SelectOptionNS.Props, 'value' | 'label'>>
  export type SelectedOption = SelectOptionNS.Value | SelectGroupNS.GroupedSelectedOptions
  export type SingleSelectedOption = [SelectOptionNS.Value, SelectOptionNS.Value?]
  export type SelectValue = Pick<Option, 'label' | 'value'>
  export type SelectOptions = (
    currentOptions: SelectNS.GroupedOptions,
    selectedOptions: SelectNS.SelectedOption,
  ) => SelectNS.GroupedOptions

  export interface GroupedOptions {
    [value: SelectOptionNS.Value]: SelectGroupNS.GroupedProps
  }

  export interface Props {
    options?: Option[]
    multiSelect?: boolean
    label?: string
    placeholder?: string
    stateMessageProps?: TypographyNS.TextNS.Props
    dropdownProps?: HTMLAttributes<HTMLDivElement>
    containerProps?: Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'>
    size?: Size
    state?: InputNS.State
    disabled?: boolean
    loading?: boolean
    labelColon?: boolean
    disabledOnLoading?: boolean
    optionsPerScroll?: number
    showSearch?: boolean
    childRef?: RefObject<HTMLDivElement>
    dropdownRef?: RefObject<HTMLDivElement>
    containerRef?: RefObject<HTMLDivElement>
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
    onWillOpen?: () => void
    onWillClose?: () => void
  }
}

export const Select: FC<SelectNS.Props> = ({
  options: providedOptions,
  labelColon = true,
  disabledOnLoading = true,
  showSearch = true,
  size = 'normal',
  state = ['neutral'],
  optionsPerScroll = 6,
  selectAllText = 'انتخاب همه',
  deselectAllText = 'غیرفعال کردن همه',
  nothingFoundText = 'موردی مطابق با جستجو پیدا نشد',
  emptyListText = 'موردی وجود ندارد',
  scrollOnOpen = window.innerWidth <= BREAKPOINTS.md,
  ...props
}) => {
  const { createClassName } = useZoomComponent('select')

  const dropdownRef = props.dropdownRef ?? useRef<HTMLDivElement>(null)
  const inputRef = props.searchInputRef ?? useRef<HTMLInputElement>(null)
  const containerRef = props.containerRef ?? useRef<HTMLInputElement>(null)
  const optionsListRef = useRef<HTMLDivElement>(null)
  const childRef = props.childRef ?? useRef<HTMLDivElement>(null)
  const selectedOptionRef = useRef<SelectNS.SingleSelectedOption | null>(null)

  const [searchQuery, setSearchQuery] = useState(props.searchQuery || '')
  const [isOpen, setIsOpen] = useState(props.defaultIsOpen)
  const [emptyState, setEmptyState] = useState<SelectNS.EmptyState>(defaultEmpty(providedOptions))
  const [options, setOptions] = useState<SelectNS.GroupedOptions>(groupOptions(providedOptions))

  const isDisabled = disabledOnLoading ? props.loading || props.disabled : props.disabled
  const spinColor = state[0] === 'neutral' ? undefined : color({ source: state[0] })
  const textSizeProps: InputNS.TextSize = {
    small: size === 'small',
    normal: size === 'normal',
    large: size === 'large',
  }
  const listStyles: CSSProperties = {
    maxHeight: optionsPerScroll * 34 + 12,
  }

  const dropdownClasses = createClassName(props.dropdownProps?.className, 'dropdown')
  const stateMessageClasses = createClassName(props.stateMessageProps?.className, 'state-message')
  const classes = createClassName(props.containerProps?.className, '', {
    [createClassName('', size)]: true,
    [createClassName('', 'open')]: !!isOpen,
    [createClassName('', state[0])]: true,
    [createClassName('', props.loading ? 'loading' : '')]: !!props.loading,
    [createClassName('', isDisabled ? 'disabled' : '')]: !!isDisabled,
  })

  const selectOptions: SelectNS.SelectOptions = (currentOptions, selectedOptions) => {
    const options = { ...currentOptions }
    const { current: prevSelectedOptions } = selectedOptionRef

    if (!props.multiSelect) {
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

    return options
  }

  const handleSelectOptions = (selectedOptions: SelectNS.SelectedOption) => {
    setOptions(options => selectOptions(options, selectedOptions))
  }

  const handleSetEmptyList = async () => {
    await sleep(20)
    const { current: optionsList } = optionsListRef
    if (!optionsList) {
      return null
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
    props.onWillClose?.()
  }

  const onOpen = () => {
    props.onWillOpen?.()
    scrollToTop(containerRef, scrollOnOpen)
    void focusSearchBox(inputRef)
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

  useOutsideClick(close, childRef, dropdownRef)
  useEffect(() => setIsOpen(props.defaultIsOpen), [props.defaultIsOpen])
  useEffect(() => setSearchQuery(props.searchQuery || ''), [props.searchQuery])
  useEffect(() => {
    setOptions(groupOptions(providedOptions))
    void handleSetEmptyList()
  }, [providedOptions])

  return (
    <div {...props.containerProps} className={classes} ref={containerRef}>
      <div className="info-container" ref={childRef} onClick={open}>
        {props.loading && <Spin size="small" className="select-spin" color={spinColor} />}

        <Text common normal {...textSizeProps} className="select-label">
          {props.label && `${props.label}${labelColon ? ':' : ''}`}
        </Text>

        <SelectValue
          options={options}
          placeholder={props.placeholder}
          size={size}
          multiSelect={props.multiSelect}
        />

        <Icon name="expand_more" className="expand-icon" />
      </div>

      {state[1] && (
        <Text {...textSizeProps} {...props.stateMessageProps} className={stateMessageClasses}>
          {state[1]}
        </Text>
      )}

      {isOpen && (
        <div {...props.dropdownProps} className={dropdownClasses} ref={dropdownRef}>
          {showSearch && emptyState !== 'empty-list' && (
            <div className="search-box">
              <Input
                placeholder="جستجو بین موارد..."
                {...props.searchInputProps}
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
                  multiSelect={!!props.multiSelect}
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
