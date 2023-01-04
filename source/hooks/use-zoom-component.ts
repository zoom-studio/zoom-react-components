import { useContext } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { zoomLogContext } from '../components'

export namespace UseZoomComponentNS {
  export type CreateClassNameFN = (
    userClassNames?: string,
    staticClassNameSuffix?: string,
    dynamicClassNames?: {
      [name: string]: boolean
    },
  ) => string
}

export const useZoomComponent = (componentName: string) => {
  const { sendLog = () => undefined } = useContext(zoomLogContext)

  const createClassName: UseZoomComponentNS.CreateClassNameFN = (
    userClassNames,
    staticClassNamesSuffix,
    dynamicClassNames,
  ): string =>
    classNames(
      `zoomrc-${componentName}${staticClassNamesSuffix ? `-${staticClassNamesSuffix}` : ''}`,
      {
        [userClassNames ?? '']: true,
        ...dynamicClassNames,
      },
    )

  return { createClassName, sendLog }
}
