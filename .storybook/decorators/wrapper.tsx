import React from 'react'

import { PartialStoryFn, Args, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'

import '../../stories/styles/_globals.scss'

export const WrapperDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>,
  _Context: StoryContext<ReactFramework, Args>,
) => (
  <div className="zoomlang-story-wrapper">
    <Story />
  </div>
)
