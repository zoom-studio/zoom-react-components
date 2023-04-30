import { BaseEditor, BaseNode, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

import { RichTextEditorMakerNS } from './components/rich-text-editor-maker/types'

declare module 'slate' {
  interface CustomElement {
    type: RichTextEditorMakerNS.ElementTypes
    children?: Descendant[]
  }

  interface Marks {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    link?: boolean
    emoji?: boolean
    mention?: boolean
    highlight?: boolean
    strikethrough?: boolean
    linkInfo?: RichTextEditorMakerNS.LinkInfo
  }

  interface CustomText extends Marks {
    text: string
  }

  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }

  interface Node extends BaseNode, Marks {
    type?: RichTextEditorMakerNS.ElementTypes
    children?: Descendant[]
  }
}

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
