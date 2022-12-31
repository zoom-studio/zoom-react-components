import React, { useEffect } from 'react'

import { PartialStoryFn, Args, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'

export const ThemeProviderDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>,
  context: StoryContext<ReactFramework, Args>,
) => {
  const theme = context.globals.theme || 'dark'

  useEffect(() => {
    document.body?.setAttribute('data-theme', theme)
  }, [theme])

  return <Story />
}
