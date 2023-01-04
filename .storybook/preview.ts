import { themes } from '@storybook/theming'
import { addDecorator } from '@storybook/react'
import { withPerformance } from 'storybook-addon-performance'
import { sentenceCase } from 'change-case'

import { WrapperDecorator } from './decorators/wrapper'
import { ReactRouterDecorator } from './decorators/react-router'
import { branding } from './branding'
import { ZoomProvider } from './decorators/zoom-provider'

import { I18nNS } from '../source/i18n'
import { ZoomProviderNS } from '../source/components'
import '../source/styles/index.scss'
import '../source/stories/styles/index.scss'

addDecorator(withPerformance)
addDecorator(WrapperDecorator)
addDecorator(ReactRouterDecorator)
addDecorator(ZoomProvider)

export const globalTypes = {
  locale: {
    description: 'Internationalization locale',
    toolbar: {
      title: 'Locale',
      icon: 'globe',
      items: I18nNS.LANGUAGES.map(({ name, narrow }) => ({
        title: sentenceCase(name),
        value: narrow,
      })),
    },
  },
  theme: {
    description: 'Change components theme',
    toolbar: {
      title: 'Theme',
      icon: 'cog',
      items: ZoomProviderNS.Themes.map(theme => ({ title: sentenceCase(theme), value: theme })),
    },
  },
  digits: {
    description: 'Change components digits style',
    toolbar: {
      title: 'Digits',
      icon: 'nut',
      items: ZoomProviderNS.Digits.map(digit => ({ title: sentenceCase(digit), value: digit })),
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
  darkMode: {
    current: 'dark',
    dark: {
      ...themes.dark,
      ...branding,
    },
    light: {
      ...themes.light,
      ...branding,
    },
  },
}
