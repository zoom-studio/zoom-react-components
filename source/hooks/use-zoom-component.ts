import { classNames } from '@zoom-studio/zoom-js-ts-utils'

export namespace UseZoomComponentNS {
  export type CreateClassNameFN = (
    userClassNames?: string,
    staticClassNameSuffix?: string,
    dynamicClassNames?: {
      [name: string]: boolean
    },
  ) => string

  export interface ReturnType {
    createClassName: CreateClassNameFN
  }
}

export const useZoomComponent = (componentName: string): UseZoomComponentNS.ReturnType => {
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

  return { createClassName }
}
