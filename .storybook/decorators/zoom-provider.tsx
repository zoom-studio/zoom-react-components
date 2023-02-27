import React, { useEffect } from 'react'

import { PartialStoryFn, Args, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'

import i18n from '../../source/i18n'
import { useI18n } from '../../source/stories/hooks/use-i18n'
import {
  ZoomProvider as ZoomrcProvider,
  ZoomLogProvider,
  ZoomLogProviderNS,
} from '../../source/components'

export const ZoomProvider = (
  Story: PartialStoryFn<ReactFramework, Args>,
  context: StoryContext<ReactFramework, Args>,
) => {
  const { t: te } = useI18n('globalErrors')
  const { t: ti } = useI18n('globalI18ns')
  const locale = context.globals.locale || 'fa'
  const localeDirection = i18n.dir(locale)
  const digits = context.globals.digits || 'latin'
  const theme = context.globals.theme || 'dark'

  useEffect(() => {
    i18n.changeLanguage(locale)
    document.dir = localeDirection
  }, [locale])

  const handleOnLog: ZoomLogProviderNS.Log = (description, error) => {
    console.error({ description, error })
    return undefined
  }

  return (
    <ZoomrcProvider
      digits={digits}
      theme={theme}
      isRTL={localeDirection === 'rtl'}
      withMessage
      withAlert
      defaultComponentsSize="normal"
    >
      <ZoomLogProvider
        onLog={handleOnLog}
        globalErrors={{ onCopyFailure: te('onCopyFailure'), onCopySuccess: te('onCopySuccess') }}
        globalI18ns={{
          imageViewer: {
            zoomInTooltip: ti('imageViewer.zoomInTooltip'),
            closeTooltip: ti('imageViewer.closeTooltip'),
            printTooltip: ti('imageViewer.printTooltip'),
            deleteTooltip: ti('imageViewer.deleteTooltip'),
            downloadTooltip: ti('imageViewer.downloadTooltip'),
            zoomOutTooltip: ti('imageViewer.zoomOutTooltip'),
            deletePopConfirmTitle: ti('imageViewer.deletePopConfirmTitle'),
            deletePopConfirmCancelButton: ti('imageViewer.deletePopConfirmCancelButton'),
            deletePopConfirmSubmitButton: ti('imageViewer.deletePopConfirmSubmitButton'),
            deletePopConfirmDescription: ti('imageViewer.deletePopConfirmDescription'),
          },
          richTextEditor: {
            normalText: ti('richTextEditor.normalText'),
            heading1: ti('richTextEditor.heading1'),
            heading2: ti('richTextEditor.heading2'),
            heading3: ti('richTextEditor.heading3'),
            heading4: ti('richTextEditor.heading4'),
            bold: ti('richTextEditor.bold'),
            strikethrough: ti('richTextEditor.strikethrough'),
            italic: ti('richTextEditor.italic'),
            link: ti('richTextEditor.link'),
            ol: ti('richTextEditor.ol'),
            ul: ti('richTextEditor.ul'),
            emoji: ti('richTextEditor.emoji'),
            icon: ti('richTextEditor.icon'),
            image: ti('richTextEditor.image'),
            file: ti('richTextEditor.file'),
            copy: ti('richTextEditor.copy'),
            cut: ti('richTextEditor.cut'),
            paste: ti('richTextEditor.paste'),
          },
        }}
      >
        <Story />
      </ZoomLogProvider>
    </ZoomrcProvider>
  )
}
