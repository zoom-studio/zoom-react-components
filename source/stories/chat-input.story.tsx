import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { ChatInput, type ChatInputNS } from '../components'
import { generateExplorerFiles } from '../fixtures'

export default {
  title: 'Chat/Chat input',
  component: ChatInput,
  args: {
    id: 'chat-input-playground',
    richTextEditorProviderProps: {},
    richTextEditorProps: { placeholder: 'Broadcast...' },
    imageExplorerProps: { files: generateExplorerFiles(100) },
    videoExplorerProps: { files: generateExplorerFiles(100) },
    fileExplorerProps: { files: generateExplorerFiles(100) },
    containerId: 'my-chat-input',
    className: 'chat-input-playground',
    containerProps: undefined,
    i18n: undefined,
    onClick: undefined,
    onSend: undefined,
    style: undefined,
  },
} as Meta<typeof ChatInput>

export const Playground: FC<ChatInputNS.Props> = props => {
  return (
    <div
      style={{
        display: 'flex',
        height: '80vh',
        background: 'rgb(41, 44, 46)',
        alignItems: 'center',
        padding: '200px 0 0 0',
      }}
    >
      <ChatInput {...props} />
    </div>
  )
}
