import React from 'react'

import { Args, PartialStoryFn, StoryContext } from '@storybook/csf'
import { ReactRenderer } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

export const ReactRouterDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>,
  _Context: StoryContext<ReactRenderer, Args>,
) => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
)
