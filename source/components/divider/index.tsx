import React, { FC } from 'react'

import { Title, TypographyNS } from '..'
import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace DividerNS {
  export interface Props extends BaseComponent {
    vertical?: boolean
    dashed?: boolean
    truncate?: boolean
    childrenPlacement?: 'start' | 'center' | 'end'
    titleProps?: TypographyNS.TitleNS.Props
    selectableTitle?: boolean
    verticalHeight?: number | string
  }
}

export const Divider: FC<DividerNS.Props> = ({
  childrenPlacement = 'start',
  truncate = true,
  verticalHeight = '1.5rem',
  selectableTitle,
  dashed,
  children,
  className,
  containerProps,
  reference,
  titleProps,
  vertical,
  style,
}) => {
  const { createClassName } = useZoomComponent('divider')

  const classes = createClassName(className, '', {
    [createClassName('', vertical ? 'vertical' : 'horizontal')]: true,
    [createClassName('', dashed ? 'dashed' : 'solid')]: true,
    [createClassName('', childrenPlacement)]: true,
    [createClassName('', 'truncate')]: !!truncate,
    [createClassName('', 'selectable')]: !!selectableTitle,
  })

  const titleClasses = createClassName(titleProps?.className, 'title')

  return (
    <div
      {...containerProps}
      className={classes}
      ref={reference}
      style={{ ...style, height: vertical ? verticalHeight : style?.height }}
    >
      {!vertical && children && (
        <div className="title-container">
          {typeof children === 'string' ? (
            <Title h6 {...titleProps} className={titleClasses}>
              {children}
            </Title>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  )
}
