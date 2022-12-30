import React from 'react'

import { PartialStoryFn, Args, StoryContext } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'

import i18nConfig from '../../source/i18n'

export const WrapperDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>,
  _Context: StoryContext<ReactFramework, Args>,
) => (
  <I18nextProvider i18n={i18nConfig}>
    <div className="zoomrc-story-wrapper">
      <Story />
    </div>
  </I18nextProvider>
)
