import { ReactNode } from 'react'

export namespace RichTextEditorMakerNS {
  export interface ChildrenCallback {
    renderEditor: () => JSX.Element
  }

  export interface Props {
    placeholder?: string
    children?: ((handlers: ChildrenCallback) => ReactNode) | ReactNode
  }
}
