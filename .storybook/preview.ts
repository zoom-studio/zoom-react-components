import { themes } from '@storybook/theming'
import { addDecorator } from '@storybook/react'
import { withPerformance } from 'storybook-addon-performance'
import { sentenceCase } from 'change-case'

import { WrapperDecorator } from './decorators/wrapper'
import { ThemeProviderDecorator } from './decorators/theme-provider'
import { ReactRouterDecorator } from './decorators/react-router'
import { I18nDecorator } from './decorators/i18n'
import { DigitProviderDecorator } from './decorators/digit-provider'
import { branding } from './branding'

import { I18nNS } from '../source/i18n'
import { ZoomProviderNS } from '../source/components'
import '../source/styles/index.scss'
import '../source/stories/styles/index.scss'

addDecorator(withPerformance)
addDecorator(WrapperDecorator)
addDecorator(ThemeProviderDecorator)
addDecorator(ReactRouterDecorator)
addDecorator(I18nDecorator)
addDecorator(DigitProviderDecorator)

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      showName: true,
      icon: 'globe',
      items: I18nNS.LANGUAGES.map(({ name, narrow }) => ({
        title: sentenceCase(name),
        value: narrow,
      })),
    },
  },
  theme: {
    name: 'Theme',
    description: 'Change components theme',
    toolbar: {
      showName: true,
      icon: 'cog',
      items: ZoomProviderNS.Themes.map(theme => ({ title: sentenceCase(theme), value: theme })),
    },
  },
  digits: {
    name: 'Digits',
    description: 'Change components digits style',
    toolbar: {
      showName: true,
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
