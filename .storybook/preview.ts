import { themes } from '@storybook/theming'
import { addDecorator } from '@storybook/react'
import { withPerformance } from 'storybook-addon-performance'

import { WrapperDecorator } from './decorators/wrapper'
import { ThemeProviderDecorator } from './decorators/theme-provider'
import { ReactRouterDecorator } from './decorators/react-router'
import { I18nDecorator } from './decorators/i18n'
import { I18nNS } from '../source/i18n'

import '../source/stories/_styles/index.scss'

addDecorator(withPerformance)
addDecorator(WrapperDecorator)
addDecorator(ThemeProviderDecorator)
addDecorator(ReactRouterDecorator)
addDecorator(I18nDecorator)

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      showName: true,
      icon: 'globe',
      items: I18nNS.LANGUAGES.map(({ name, narrow }) => ({ title: name, value: narrow })),
    },
  },
}

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
    selector: '#zoomrc-story-theme-provider',
    dataAttr: 'data-theme',
  },
}
