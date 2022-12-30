import React, { useEffect } from 'react'

import { PartialStoryFn, Args, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'

import i18n from '../../source/i18n'

export const I18nDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>,
  context: StoryContext<ReactFramework, Args>,
) => {
  const locale = context.globals.locale || 'fa'

  useEffect(() => {
    i18n.changeLanguage(locale)
    const direction = i18n.dir(locale)
    document.dir = direction
  }, [locale])

  return <Story />
}
