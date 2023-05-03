import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

import { DefaultElement } from '../elements'

export namespace HeadingElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const HeadingElement: FC<HeadingElementNS.Props> = ({ children, attributes, element }) => {
  switch (element.type) {
    case 'h1': {
      return <h1 {...attributes}>{children}</h1>
    }
    case 'h2': {
      return <h2 {...attributes}>{children}</h2>
    }
    case 'h3': {
      return <h3 {...attributes}>{children}</h3>
    }
    case 'h4': {
      return <h4 {...attributes}>{children}</h4>
    }
    default: {
      return <DefaultElement children={children} attributes={attributes} element={element} />
    }
  }
}
