import React, { FC, RefObject } from 'react'

import { ResizableMaker } from '..'
import { logs } from '../../constants'
import { ZoomLogProviderNS } from '../zoom-log-provider'

export namespace ResizeEditorHandleNS {
  export interface ResizableInfo {
    clientY: number
    height: number
    isResizing: boolean
  }

  export interface Props {
    editorContainerRef: RefObject<HTMLDivElement>
    sendLog: ZoomLogProviderNS.Log
  }
}

export const ResizeEditorHandle: FC<ResizeEditorHandleNS.Props> = ({
  editorContainerRef,
  sendLog,
}) => {
  const getResizableElement = (): HTMLDivElement => {
    const { current: editorContainer } = editorContainerRef
    if (!editorContainer) {
      sendLog(
        logs.richTextEditorEditorContainerRefNotFound,
        'ResizeEditorHandle, getResizableElement fn',
      )
    }

    const editorScrollView = editorContainer?.querySelector('.zoomrc-scroll-view') as
      | HTMLDivElement
      | undefined

    if (!editorScrollView) {
      sendLog(
        logs.richTextEditorEditorScrollViewNotFound,
        'ResizeEditorHandle, getResizableElement fn',
      )
      return document.createElement('div')
    }
    return editorScrollView
  }

  return (
    <ResizableMaker resizable={getResizableElement}>
      {({ resize }) => <div className="resize-editor-handle" onMouseDown={resize('bottom')} />}
    </ResizableMaker>
  )
}
