import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import {
  Checkbox,
  Dialog,
  Divider,
  Input,
  RichTextEditor,
  RichTextEditorNS,
  Stack,
} from '../components'
import { generateExplorerFiles } from '../fixtures'
import { StoryJSONResult, StoryPlayground, WithButtonsStory, WithMessagesStory } from './components'

export default {
  title: 'Data entry/Rich text editor',
  component: RichTextEditor,
  args: {
    placeholder: 'شروع به نوشتن متن جدید...',
    autoFocus: true,
    imageExplorerProps: {
      files: generateExplorerFiles(100),
    },
  },
} as ComponentMeta<typeof RichTextEditor>

export const Playground: FC<RichTextEditorNS.Props> = props => {
  const [handlers, setHandlers] = useState<RichTextEditorNS.Handlers>()
  const [editorData, setEditorData] = useState<object>()

  return (
    <>
      <Dialog
        title="Editor data"
        isOpen={!!editorData}
        onClose={() => setEditorData(undefined)}
        cancelButton={false}
      >
        {editorData && <StoryJSONResult data={editorData} collapsed={3} />}
      </Dialog>

      <WithMessagesStory
        messages={[
          `Updater key: ${handlers?.updaterKey}`,
          `Is cursor over a link: ${handlers?.selectionLink.containsLink}`,
          `Is range selected: ${handlers?.rangeSelected}`,
        ]}
      >
        <WithButtonsStory
          groupedButtons={false}
          secondaryChild={
            <Stack dividers={<Divider vertical />}>
              <Checkbox
                label="Blanked link"
                checked={handlers?.selectionLink.isBlanked.val}
                onWrite={handlers?.selectionLink.isBlanked.set}
                disabled={!handlers?.rangeSelected || !handlers?.selectionLink.containsLink}
              />
              <Checkbox
                label="No follow link"
                checked={handlers?.selectionLink.isNoFollowed.val}
                onWrite={handlers?.selectionLink.isNoFollowed.set}
                disabled={!handlers?.rangeSelected || !handlers?.selectionLink.containsLink}
              />
              <Input
                placeholder="Link URL"
                value={handlers?.selectionLink.URL.val}
                onWrite={handlers?.selectionLink.URL.set}
                disabled={!handlers?.rangeSelected || !handlers?.selectionLink.containsLink}
              />
            </Stack>
          }
          buttons={[
            {
              children: 'Export data',
              onClick: () => setEditorData(handlers?.exportData()),
              type: 'link',
            },
            { children: 'Focus', onClick: () => handlers?.focusEditor(), type: 'link' },
            {
              children: 'Emoji',
              onClick: () => handlers?.insertEmoji('smiling face'),
              type: 'link',
            },
            {
              children: 'H1',
              onClick: () => handlers?.toggleStyle('header-one'),
              type: handlers?.containsStyle('header-one') ? 'link' : 'text',
            },
            {
              children: 'H2',
              onClick: () => handlers?.toggleStyle('header-two'),
              type: handlers?.containsStyle('header-two') ? 'link' : 'text',
            },
            {
              children: 'H3',
              onClick: () => handlers?.toggleStyle('header-three'),
              type: handlers?.containsStyle('header-three') ? 'link' : 'text',
            },
            {
              children: 'H4',
              onClick: () => handlers?.toggleStyle('header-four'),
              type: handlers?.containsStyle('header-four') ? 'link' : 'text',
            },
            {
              children: 'Bold',
              onClick: () => handlers?.toggleStyle('BOLD'),
              type: handlers?.containsStyle('BOLD') ? 'link' : 'text',
            },
            {
              children: 'Italic',
              onClick: () => handlers?.toggleStyle('ITALIC'),
              type: handlers?.containsStyle('ITALIC') ? 'link' : 'text',
            },
            {
              children: 'Underline',
              onClick: () => handlers?.toggleStyle('UNDERLINE'),
              type: handlers?.containsStyle('UNDERLINE') ? 'link' : 'text',
            },
            {
              children: 'Blockquote',
              onClick: () => handlers?.toggleStyle('blockquote'),
              type: handlers?.containsStyle('blockquote') ? 'link' : 'text',
            },
            {
              children: 'Ordered list',
              onClick: () => handlers?.toggleStyle('ordered-list-item'),
              type: handlers?.containsStyle('ordered-list-item') ? 'link' : 'text',
            },
            {
              children: 'Unordered list',
              onClick: () => handlers?.toggleStyle('unordered-list-item'),
              type: handlers?.containsStyle('unordered-list-item') ? 'link' : 'text',
            },
            {
              children: 'Link',
              onClick: () => handlers?.insertLink('example.com', true, true),
              disabled: !handlers?.rangeSelected,
              type: handlers?.selectionLink.containsLink ? 'link' : 'text',
            },
            {
              children: 'Remove link',
              onClick: () => handlers?.removeLink(),
              disabled: !handlers?.selectionLink.containsLink,
            },
          ]}
        >
          <StoryPlayground
            component={RichTextEditor}
            props={{ ...props, setEditorHandlers: setHandlers }}
          />
        </WithButtonsStory>
      </WithMessagesStory>
    </>
  )
}
