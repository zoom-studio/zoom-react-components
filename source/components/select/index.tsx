import React, { FC, HTMLAttributes } from 'react'

import { InputNS } from '..'
import { useZoomComponent } from '../../hooks'
// import { SelectGroup } from './group'
// import { SelectOption } from './option'

export namespace SelectNS {
  export type Size = 'small' | 'normal' | 'large'

  export interface Option {
    label: string
    value: string | number
    disabled?: boolean
  }

  export interface Group {
    title: string
    options?: Option[]
    disabled?: boolean
  }

  export interface Props
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
    options?: Option[] | Group[]
    multiSelect?: boolean
    label?: string
    placeholder?: string
    onChange?: (option: Option, path: string) => void
    size?: Size
    state?: InputNS.State
    disabled?: boolean
    loading?: boolean
    labelColon?: boolean
    disabledOnLoading?: boolean
    showSearch?: boolean
  }
}

export const Select: FC<SelectNS.Props> = ({
  labelColon = true,
  disabledOnLoading = true,
  showSearch = true,
  size = 'normal',
  state = ['neutral'],
  options = [],
  className,
  multiSelect,
  label,
  placeholder,
  onChange,
  disabled,
  loading,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('select')
  const classes = createClassName(className, size)

  return <div {...rest} className={classes}></div>
}
