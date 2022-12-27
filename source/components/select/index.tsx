import React, {
  CSSProperties,
  FC,
  FormEvent,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useRef,
} from 'react'

import { Icon, Input, InputNS, Spin, Text, TypographyNS } from '..'
import {
  useDependedState,
  useOutsideClick,
  useZoomComponent,
} from '../../hooks'
import { color } from '../../utils'
import { SelectGroup, SelectGroupNS } from './group'
import { SelectOption, SelectOptionNS } from './option'

export namespace SelectNS {
  export type Size = 'small' | 'normal' | 'large'
  export type Option = SelectGroupNS.Props & SelectOptionNS.Props
  export type SingleOption = Array<
    Pick<SelectOptionNS.Props, 'value' | 'label'>
  >

  export interface Props
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
    options?: Option[]
    multiSelect?: boolean
    label: string
    placeholder?: string
    value?: SelectOptionNS.Value
    stateMessageProps?: TypographyNS.TextNS.Props
    dropdownProps?: HTMLAttributes<HTMLDivElement>
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
    defaultIsOpen?: boolean
    searchInputProps?: InputNS.Props
    selectAllText?: string
    deselectAllText?: string
    onChange?: (options: SingleOption[]) => void
    onWillOpen?: () => void
    onWillClose?: () => void
  }
}

export const Select: FC<SelectNS.Props> = ({
  childRef: customChildRef,
  dropdownRef: customDropdownRef,
  options: providedOptions = [],
  labelColon = true,
  disabledOnLoading = true,
  showSearch = true,
  size = 'normal',
  state = ['neutral'],
  optionsPerScroll = 6,
  selectAllText = 'انتخاب همه',
  deselectAllText = 'غیرفعال کردن همه',
  defaultIsOpen,
  className,
  searchInputProps,
  dropdownProps,
  multiSelect,
  label,
  stateMessageProps,
  placeholder,
  onChange,
  disabled,
  loading,
  value,
  onWillClose,
  onWillOpen,
  ...rest
}) => {
  const childRef = customChildRef ?? useRef<HTMLDivElement>(null)
  const dropdownRef = customDropdownRef ?? useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useDependedState(defaultIsOpen)
  const [options, setOptions] = useDependedState(providedOptions)
  const { createClassName } = useZoomComponent('select')
  const isDisabled = disabledOnLoading ? loading || disabled : disabled

  const classes = createClassName(className, '', {
    [createClassName('', size)]: true,
    [createClassName('', state[0])]: true,
    [createClassName('', loading ? 'loading' : '')]: !!loading,
    [createClassName('', isDisabled ? 'disabled' : '')]: !!isDisabled,
  })

  const valueAndPlaceholderClasses = createClassName(
    '',
    value ? 'value' : 'placeholder',
  )

  const dropdownClasses = createClassName(dropdownProps?.className, 'dropdown')

  const stateMessageClasses = createClassName(
    stateMessageProps?.className,
    'state-message',
  )

  const textSizeProps: InputNS.TextSize = {
    small: size === 'small',
    normal: size === 'normal',
    large: size === 'large',
  }

  const spinColor =
    state[0] === 'neutral' ? undefined : color({ source: state[0] })

  const close = () => {
    setIsOpen(currentIsOpen => {
      if (currentIsOpen) {
        onWillClose?.()
      }
      return false
    })
  }

  const open = () => {
    setIsOpen(currentIsOpen => {
      if (currentIsOpen) {
        onWillClose?.()
        return false
      }
      onWillOpen?.()
      return true
    })
  }

  useOutsideClick(close, childRef, dropdownRef)

  const deselectFirstSelected = (sourceOptions: SelectNS.Option[]) => {
    for (const source of sourceOptions) {
      if (source.selected) {
        source.selected = false
        break
      }

      if (source.options && source.options.length > 0) {
        for (const sourceChild of source.options) {
          if (sourceChild.selected) {
            sourceChild.selected = false
            break
          }
        }
      }
    }
  }

  const selectOption = (
    source: SelectNS.Option,
    selectedOptions: SelectNS.Option[],
    isSelectAllButton?: boolean,
  ) => {
    const changeSelection = (source: SelectNS.Option) => {
      if (isSelectAllButton) {
        const newSelection = !selectedOptions.some(option => option.selected)
        selectedOptions.forEach(
          selectedOption => (selectedOption.selected = newSelection),
        )
      } else {
        source.selected = !source.selected
      }
    }

    for (const target of selectedOptions) {
      if (target.value === source.value) {
        if (!source.disabled) {
          if (multiSelect) {
            changeSelection(source)
            continue
          } else {
            deselectFirstSelected(options)
            changeSelection(source)
            // close()
            break
          }
        }
      }
    }
  }

  const selectOptions = (
    sourceOptions: SelectNS.Option[],
    selectedOptions: SelectNS.Option[],
    isSelectAllButton?: boolean,
  ) => {
    const options = [...sourceOptions]

    for (const source of options) {
      if (source.options && source.options.length > 0) {
        for (const sourceChild of source.options) {
          selectOption(sourceChild, selectedOptions, isSelectAllButton)
        }
      } else {
        selectOption(source, selectedOptions, isSelectAllButton)
      }
    }
    return options
  }

  const handleSelectOptions =
    (selectedOptions: SelectNS.Option[], isSelectAllButton?: boolean) => () => {
      setOptions(options =>
        selectOptions(options, selectedOptions, isSelectAllButton),
      )
    }

  const renderOption = (option: SelectNS.Option, index: number): ReactNode => {
    if ((option.options?.length || 0) > 0) {
      return (
        <SelectGroup
          {...option}
          onSelect={option => handleSelectOptions([option])}
          onSelectAll={options => handleSelectOptions(options, true)}
          key={index}
          multiSelect={!!multiSelect}
          selectAllText={selectAllText}
          deselectAllText={deselectAllText}
        />
      )
    }
    return (
      <SelectOption
        {...option}
        onSelect={handleSelectOptions([option])}
        key={index}
      />
    )
  }

  const filterOptions = (currentOptions: SelectNS.Option[], query: string) => {
    const options = [...currentOptions]
    const newOptions: SelectNS.Option[] = []

    for (const option of options) {
      if (option.label.includes(query)) {
        newOptions.push(option)
      }

      // if (option.options && option.options.length > 0) {
      //   for (const childOption of option.options) {
      //     if (childOption.label.includes(query)) {
      //       for (const filteredOption of newOptions) {
      //         if (filteredOption.value === childOption.value) {
      //           filteredOption.options?.push(childOption)
      //         } else {
      //           newOptions.push({
      //             ...option,
      //             options: [childOption],
      //           })
      //         }
      //       }
      //     }
      //   }
      // }
    }

    return options
  }

  const handleOnFilter = (evt: FormEvent<HTMLInputElement>) => {
    const { value: query } = evt.currentTarget
    setOptions(options => filterOptions(options, query))
  }

  const listStyles: CSSProperties = {
    maxHeight: optionsPerScroll * 34 + 12,
  }

  return (
    <div {...rest} className={classes}>
      <div className="info-container" ref={childRef} onClick={open}>
        {loading && (
          <Spin size="small" className="select-spin" color={spinColor} />
        )}

        <Text common normal {...textSizeProps} className="select-label">
          {`${label}${labelColon ? ':' : ''}`}
        </Text>

        <Text
          common
          normal
          className={valueAndPlaceholderClasses}
          {...textSizeProps}
        >
          {value ?? placeholder}
        </Text>

        <Icon name="expand_more" className="expand-icon" />
      </div>

      {state[1] && (
        <Text
          {...textSizeProps}
          {...stateMessageProps}
          className={stateMessageClasses}
        >
          {state[1]}
        </Text>
      )}

      {isOpen && (
        <div {...dropdownProps} className={dropdownClasses} ref={dropdownRef}>
          {showSearch && (
            <div className="search-box">
              <Input
                placeholder="جستجو بین موارد..."
                {...searchInputProps}
                labelContainerProps={{ className: 'search-input-container' }}
                onInput={handleOnFilter}
              />
            </div>
          )}
          <div className="options-list" style={listStyles}>
            {options.map(renderOption)}
          </div>
        </div>
      )}
    </div>
  )
}
