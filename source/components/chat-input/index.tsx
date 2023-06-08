import React, { forwardRef, type KeyboardEvent } from 'react'

import { useObjectedState } from '@zoom-studio/zoom-js-ts-utils'

import {
  Button,
  EmojiPicker,
  Menu,
  Popover,
  RichTextEditorMaker,
  ScrollView,
  Stack,
  type RichTextEditorMakerNS,
  type RichTextEditorNS,
} from '..'
import { useZoomComponent } from '../../hooks'
import type { BaseComponent } from '../../types'

import { type RichTextEditorMakerProviderNS } from '../rich-text-editor-maker/provider'
import { RichUtils } from '../rich-text-editor-maker/utils/rich-utils'
import { FileExplorer, ImageExplorer, VideoExplorer } from '../rich-text-editor/inserters'

import { useChatInputI18n, type UseChatInputI18nNS } from './use-i18n'

export namespace ChatInputNS {
  export type I18n = UseChatInputI18nNS.I18n

  export interface Props extends Omit<BaseComponent, 'children' | 'id'> {
    id: string
    imageExplorerProps?: RichTextEditorNS.ImageExplorerProps
    videoExplorerProps?: RichTextEditorNS.VideoExplorerProps
    fileExplorerProps?: RichTextEditorNS.FileExplorerProps
    containerId?: string
    i18n?: I18n
    onSend?: (value: string) => void
    richTextEditorProps?: Omit<RichTextEditorMakerNS.Props, 'editor' | 'children' | 'onKeyDown'>
    richTextEditorProviderProps?: Omit<
      RichTextEditorMakerProviderNS.Props,
      'id' | 'children' | 'defaultValue'
    >
  }
}

export const ChatInput = forwardRef<HTMLDivElement, ChatInputNS.Props>(
  (
    {
      i18n: componentI18n,
      className,
      containerProps,
      id,
      containerId,
      richTextEditorProviderProps,
      richTextEditorProps,
      onSend,
      fileExplorerProps,
      imageExplorerProps,
      videoExplorerProps,
      ...rest
    },
    reference,
  ) => {
    const { createClassName, globalI18ns } = useZoomComponent('chat-input')
    const i18n = useChatInputI18n(globalI18ns, componentI18n)

    const classes = createClassName(className)

    const isImageDialogOpen = useObjectedState(false)
    const isVideoDialogOpen = useObjectedState(false)
    const isFileDialogOpen = useObjectedState(false)

    const handleOnSend = (editor: RichTextEditorMakerNS.Editor) => {
      const richUtils = new RichUtils({ editor })

      if (richUtils.isValid()) {
        onSend?.(JSON.stringify(editor.children))
      }
    }

    const openImageDialog = () => {
      isImageDialogOpen.set(true)
    }

    const openVideoDialog = () => {
      isVideoDialogOpen.set(true)
    }

    const openFileDialog = () => {
      isFileDialogOpen.set(true)
    }

    const handleOnKeyDown =
      (editor: RichTextEditorMakerNS.Editor) => (evt: KeyboardEvent<HTMLDivElement>) => {
        if (evt.ctrlKey && evt.key === 'Enter') {
          handleOnSend(editor)
        }
      }

    return (
      <div {...rest} {...containerProps} className={classes} id={containerId} ref={reference}>
        <RichTextEditorMaker.provider {...richTextEditorProviderProps} id={id}>
          {({ providerEditor }) => (
            <RichTextEditorMaker
              {...richTextEditorProps}
              editor={providerEditor}
              onKeyDown={handleOnKeyDown(providerEditor)}
            >
              {handlers => (
                <>
                  <ImageExplorer
                    defaultTypeQuery={i18n.images}
                    imageExplorerProps={imageExplorerProps}
                    handleCreateImage={handlers.insertImage}
                    isImageDialogOpen={isImageDialogOpen}
                  />

                  <VideoExplorer
                    defaultTypeQuery={i18n.videos}
                    videoExplorerProps={videoExplorerProps}
                    handleCreateVideo={handlers.insertVideo}
                    isVideoDialogOpen={isVideoDialogOpen}
                  />

                  <FileExplorer
                    fileExplorerProps={fileExplorerProps}
                    handleCreateFile={handlers.insertFile}
                    isFileDialogOpen={isFileDialogOpen}
                  />

                  <Stack className="sections-container" align="flex-end">
                    <Popover
                      placement="top-start"
                      trigger="click"
                      className="emoji-picker-popover"
                      content={<EmojiPicker onSelect={handlers.insertEmoji} />}
                      showArrow={false}
                    >
                      <Button
                        prefixMaterialIcon="sentiment_satisfied_alt"
                        shape="square"
                        type="text"
                        className="action-button"
                      />
                    </Popover>

                    <Menu
                      items={[
                        { title: i18n.attacheFile, onClick: openFileDialog },
                        { title: i18n.attacheImage, onClick: openImageDialog },
                        { title: i18n.attacheVideo, onClick: openVideoDialog },
                      ]}
                      prefixMaterialIcon="attachment"
                      shape="square"
                      type="text"
                      className="action-button"
                    />

                    <Stack.item grow={1} className="editor">
                      <ScrollView
                        maxHeight="20vh"
                        minWidth="100%"
                        minHeight="30px"
                        className="editor-scroll-view"
                      >
                        {handlers.renderEditor()}
                      </ScrollView>
                    </Stack.item>

                    <Button
                      prefixMaterialIcon="send"
                      shape="square"
                      className="action-button"
                      disabled={!handlers.isValid()}
                      materialIconProps={{ flipOn: 'rtl' }}
                      onClick={() => {
                        handleOnSend(providerEditor)
                      }}
                    />
                  </Stack>
                </>
              )}
            </RichTextEditorMaker>
          )}
        </RichTextEditorMaker.provider>
      </div>
    )
  },
)
