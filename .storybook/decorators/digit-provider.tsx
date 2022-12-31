import React, { useEffect } from 'react'

import { PartialStoryFn, Args, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'

export const DigitProviderDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>,
  context: StoryContext<ReactFramework, Args>,
) => {
  const digits = context.globals.digits || 'latin'

  useEffect(() => {
    document.body?.setAttribute('data-digits', digits)
  }, [digits])

  return <Story />
}
