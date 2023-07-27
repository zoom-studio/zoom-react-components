import React, { type FC } from 'react'

import { FloatingFocusManager, FloatingOverlay, FloatingPortal } from '@floating-ui/react'

import { type useMacOSSelect } from './use-mac-os-select'
import { useZoomComponent } from '../../hooks'
import { type CommonSize } from '../../types'

export namespace OptionsPortalNS {
  export interface Props {
    select: ReturnType<typeof useMacOSSelect>
    children: JSX.Element
    size: CommonSize
    showSearch: boolean
  }
}

export const OptionsPortal: FC<OptionsPortalNS.Props> = ({
  select,
  children,
  size,
  showSearch,
}) => {
  const { createClassName } = useZoomComponent('select-portal')

  const classes = createClassName('', '', {
    [createClassName('', size)]: true,
    [createClassName('', 'with-search-box')]: showSearch,
  })

  return (
    <>
      {select.open && (
        <FloatingPortal>
          <FloatingOverlay
            ref={select.floatingOverlayRef}
            lockScroll={!select.touch}
            style={{ zIndex: 1 }}
            className={classes}
          >
            <FloatingFocusManager context={select.context} modal={false}>
              {children}
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  )
}
