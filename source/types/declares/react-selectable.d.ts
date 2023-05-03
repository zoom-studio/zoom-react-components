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
