import { Children, FC, isValidElement, ReactNode, ReactElement } from 'react'

import _ from 'lodash'

const isOfTargetType = (
  child: ReactElement,
  ...allowedElements: FC[]
): boolean => _.every(allowedElements, element => child.type === element)

export const strictRender = (
  children: ReactNode,
  ...allowedElements: FC[]
): ReactNode => {
  return Children.map(children, child => {
    if (isValidElement(child) && isOfTargetType(child, ...allowedElements)) {
      return child
    }
  })
}
