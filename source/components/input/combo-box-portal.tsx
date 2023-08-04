import React, { type FC } from 'react'

import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react'

import { ComboBoxItem } from './combo-box-item'
import { type useComboBox } from './use-combobox'
import { useZoomComponent } from '../../hooks'

export namespace ComboBoxPortalNS {
  export interface Props {
    comboBox: ReturnType<typeof useComboBox>
    setValue: (value: string) => void
    inputValue: string
  }
}

export const ComboBoxPortal: FC<ComboBoxPortalNS.Props> = ({ comboBox, setValue, inputValue }) => {
  const { createClassName } = useZoomComponent('combo-box-portal')

  const classes = createClassName()

  const handleOnItemClick = (item: string) => () => {
    setValue(item)
    comboBox.setOpen(false)
    comboBox.refs.domReference.current?.focus()
  }

  return (
    <FloatingPortal>
      {comboBox.open && (
        <FloatingFocusManager context={comboBox.context} initialFocus={-1} visuallyHiddenDismiss>
          <div
            className={classes}
            {...comboBox.getFloatingProps({
              ref: comboBox.refs.setFloating,
              style: comboBox.floatingStyles,
            })}
          >
            {comboBox.items.map((item, index) => (
              <ComboBoxItem
                key={index}
                item={item}
                active={comboBox.activeIndex === index}
                {...comboBox.getItemProps({
                  key: item,
                  onClick: handleOnItemClick(item),
                  ref: node => {
                    comboBox.listRef.current[index] = node
                  },
                })}
              >
                {item}
              </ComboBoxItem>
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  )
}
