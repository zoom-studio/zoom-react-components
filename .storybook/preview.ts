import { themes } from '@storybook/theming'
import { addDecorator } from '@storybook/react'
import { withPerformance } from 'storybook-addon-performance'

import { WrapperDecorator } from './decorators/wrapper'
import { ThemeProviderDecorator } from './decorators/theme-provider'
import { ReactRouterDecorator } from './decorators/react-router'
import '../source/styles/index.scss'

addDecorator(withPerformance)
addDecorator(WrapperDecorator)
addDecorator(ThemeProviderDecorator)
addDecorator(ReactRouterDecorator)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
  theme: {
    selector: '#zoomlang-story-theme-provider',
    dataAttr: 'data-theme',
  },
}
