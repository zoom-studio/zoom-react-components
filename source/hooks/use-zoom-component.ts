import { useContext } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { zoomGlobalConfigContext } from '../components'

export namespace UseZoomComponentNS {
  export type CreateClassNameFN = (
    userClassNames?: string,
    staticClassNameSuffix?: string,
    dynamicClassNames?: Record<string, boolean>,
  ) => string
}

export const useZoomComponent = (componentName: string) => {
  const {
    sendLog = () => undefined,
    globalErrors,
    globalI18ns,
  } = useContext(zoomGlobalConfigContext)

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

  return { createClassName, sendLog, globalErrors, globalI18ns }
}
