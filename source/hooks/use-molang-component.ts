import motils from 'motils'

export namespace UsezoomlangComponentNS {
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

export const usezoomlangComponent = (
  componentName: string,
): UsezoomlangComponentNS.ReturnType => {
  const createClassName: UsezoomlangComponentNS.CreateClassNameFN = (
    userClassNames,
    staticClassNamesSuffix,
    dynamicClassNames,
  ): string =>
    motils.classNames(
      `zoomlang-${componentName}${
        staticClassNamesSuffix ? `-${staticClassNamesSuffix}` : ''
      }`,
      {
        [userClassNames ?? '']: true,
        ...dynamicClassNames,
      },
    )

  return { createClassName }
}
