import React from 'react'

import { PartialStoryFn, Args, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'

export const ThemeProviderDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>,
  _Context: StoryContext<ReactFramework, Args>,
) => (
  <div id="zoomrc-story-theme-provider" data-theme="dark" data-digits="latin">
    <Story />
  </div>
)
