import React, { forwardRef } from 'react'

import { fixNumberLocale, reactChildrenToString, type MaybeArray } from '@zoom-studio/js-ts-utils'
import Highlighter from 'react-highlight-words'

import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace HighlightNS {
  export interface Props extends BaseComponent {
    search?: MaybeArray<string>
  }
}

export const Highlight = forwardRef<HTMLDivElement, HighlightNS.Props>(
  ({ search = '', children, className, containerProps, ...rest }, reference) => {
    const { createClassName } = useZoomComponent('highlight')

    const classes = createClassName(className)

    return (
      <div {...containerProps} {...rest} ref={reference} className={classes}>
        <Highlighter
          className="highlight-child"
          highlightClassName="highlight"
          unhighlightClassName="no-highlight"
          sanitize={fixNumberLocale}
          caseSensitive={false}
          searchWords={typeof search === 'string' ? [search] : search}
          textToHighlight={reactChildrenToString(children)}
        />
      </div>
    )
  },
)
