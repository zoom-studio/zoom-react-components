import React, { forwardRef } from 'react'

import { Button, ButtonNS, Spin } from '..'
import { useZoomComponent } from '../../hooks'
import { BaseComponent, Color } from '../../types'
import { colorFnToColor } from '../../utils'

export namespace FilterButtonNS {
  export interface Props
    extends BaseComponent<HTMLButtonElement>,
      Pick<
        ButtonNS.Props,
        | 'size'
        | 'disabled'
        | 'children'
        | 'href'
        | 'target'
        | 'loading'
        | 'active'
        | 'disabledOnLoading'
        | 'prefixMaterialIcon'
        | 'prefixEmojiIcon'
        | 'useSpan'
        | 'className'
        | 'onClick'
      > {
    color: Color
  }
}

export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonNS.Props>(
  ({ color, className, active, loading, containerProps, ...rest }, reference) => {
    color = colorFnToColor(color)
    const { createClassName } = useZoomComponent('filter-button')

    const innerChildClasses = createClassName('', 'inner-child')

    const classes = createClassName(className, '', {
      [createClassName('', 'active')]: !!active,
    })

    return (
      <Button
        style={{ '--zoomrc-filter-button-color': color } as object}
        className={classes}
        htmlType="button"
        variant="neutral"
        shape="rounded"
        type="secondary"
        loading={loading}
        showSpinOnLoading={false}
        ref={reference}
        {...containerProps}
        {...rest}
      >
        <span className={innerChildClasses}>
          {loading ? (
            <Spin size="small" className="xxxxxxx" color={color} />
          ) : (
            <span className="badge" />
          )}
          <span className="content">{rest.children}</span>
        </span>
      </Button>
    )
  },
)
