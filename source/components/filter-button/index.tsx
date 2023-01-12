import React, { FC } from 'react'

import { useZoomComponent } from '../../hooks'
import { Color } from '../../types'
import { Button, ButtonNS, Spin } from '..'
import { colorFnToColor } from '../../utils'

export namespace FilterButtonNS {
  export interface Props
    extends Pick<
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

export const FilterButton: FC<FilterButtonNS.Props> = ({
  color,
  className,
  active,
  loading,
  ...rest
}) => {
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
}
