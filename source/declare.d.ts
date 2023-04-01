declare module '*.svg'

declare module 'draft-js-divider-plugin' {
  export default () => any
}

declare module 'draft-js-markdown-shortcuts-plugin' {
  export default () => any
}

declare module 'react-rangeslider' {
  interface SliderProps {
    disabled?: boolean | undefined
    format?: ((value: number) => React.ReactNode) | undefined
    handleLabel?: React.ReactNode | undefined
    labels?: { [value: number]: React.ReactNode } | undefined
    max?: number | undefined
    min?: number | undefined
    onChange?: (value: number) => void
    onChangeComplete?: (value: number) => void
    onChangeStart?: (value: number) => void
    orientation?: string | undefined
    reverse?: boolean | undefined
    step?: number | undefined
    tooltip?: boolean | undefined
    className?: string | undefined
    value: number
  }

  export default class Slider extends React.Component<SliderProps> {}
}

declare module 'react-selectable' {
  interface ReactSelectableGroupProps {
    onSelection?: (selectedItems: number[], evt: MouseEvent) => void
    onNonItemClick?: (evt: MouseEvent) => void
    tolerance?: number
    component?: string
    fixedPosition?: boolean
    selectOnMouseMove?: boolean
    preventDefault?: boolean
    enabled?: boolean
    [key: string]: any
  }

  interface ReactSelectableComponentProps {
    key?: number | string
    selected?: boolean
    selectableKey?: number | string
  }

  export class SelectableGroup extends React.Component<ReactSelectableGroupProps> {}

  export const createSelectable = <T>(component: React.FC<T>) => {
    return class SelectableComponent extends React.Component<ReactSelectableComponentProps & T> {}
  }

  export type SelectableComponent = ReturnType<typeof createSelectable>
}
