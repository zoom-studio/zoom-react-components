import React, { useEffect } from 'react'

import { PartialStoryFn, Args, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'

import i18n from '../../source/i18n'
import {
  ZoomProvider as ZoomrcProvider,
  ZoomLogProvider,
  ZoomLogProviderNS,
} from '../../source/components'

export const ZoomProvider = (
  Story: PartialStoryFn<ReactFramework, Args>,
  context: StoryContext<ReactFramework, Args>,
) => {
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
    <ZoomrcProvider digits={digits} theme={theme} isRTL={localeDirection === 'rtl'} withMessage>
      <ZoomLogProvider onLog={handleOnLog}>
        <Story />
      </ZoomLogProvider>
    </ZoomrcProvider>
  )
}
