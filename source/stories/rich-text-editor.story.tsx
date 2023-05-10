import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { RichTextEditor, RichTextEditorNS } from '../components'
// import { RichTextEditor, RichTextEditorNS } from '../components/rich-text-editor.2'
// import { RichTextEditor, RichTextEditorNS } from '../components/rich-text-editor.1'

import { generateExplorerFiles, lorem } from '../fixtures'
import { StoryPlayground } from './components'

export default {
  title: 'Data entry/Rich text editor',
  component: RichTextEditor,
  args: {
    id: 'playground-rich-text-editor',
    // maxHeight: 700,
    initialHeight: 700,
    //   editorProps: {
    //     placeholder: 'شروع به نوشتن متن جدید...',
    //     autoFocus: true,
    //   },
    imageExplorerProps: {
      files: generateExplorerFiles(100),
    },
    videoExplorerProps: {
      files: generateExplorerFiles(100),
    },
    fileExplorerProps: {
      files: generateExplorerFiles(100),
    },
  },
} as ComponentMeta<typeof RichTextEditor>

export const Playground: FC<RichTextEditorNS.Props> = props => {
  return (
    <>
      {lorem(2)}
      <StoryPlayground component={RichTextEditor} props={props} />
      {lorem(100)}
    </>
  )
}
