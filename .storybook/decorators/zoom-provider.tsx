import React, { useEffect } from 'react'

import { PartialStoryFn, Args, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'

import i18n from '../../source/i18n'
import { ZoomProvider as ZoomrcProvider } from '../../source/components'

export const ZoomProvider = (
  Story: PartialStoryFn<ReactFramework, Args>,
  context: StoryContext<ReactFramework, Args>,
) => {
  const locale = context.globals.locale || 'fa'
  const digits = context.globals.digits || 'latin'
  const theme = context.globals.theme || 'dark'

  useEffect(() => {
    i18n.changeLanguage(locale)
    const direction = i18n.dir(locale)
    document.dir = direction
  }, [locale])

  return (
    <ZoomrcProvider digits={digits} theme={theme}>
      <Story />
    </ZoomrcProvider>
  )
}
