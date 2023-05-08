import { useContext } from 'react'

import { EditorContext, RichTextEditorMakerProviderNS } from '../provider'

export const useEditorContext = () => {
  const ctx = useContext(EditorContext)
  return <Required<RichTextEditorMakerProviderNS.ProviderValue>>ctx
}
