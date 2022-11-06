import React from 'react'

import { Args, PartialStoryFn, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

export const ReactRouterDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>,
  _Context: StoryContext<ReactFramework, Args>,
) => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
)
