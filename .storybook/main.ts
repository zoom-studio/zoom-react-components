const path = require('path')

import { StorybookConfig } from '@storybook/react-webpack5'

module.exports = <StorybookConfig>{
  framework: { name: '@storybook/react-webpack5', options: {} },
  docs: { autodocs: 'tag' },
  stories: ['../source/stories/*/*.mdx', '../source/stories/*.story.tsx'],
  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    if (!config.module) {
      config.module = { rules: [] }
    }
    config.module.rules!.push(
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    )
    return config
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: {
            printWidth: 100,
            singleQuote: true,
            tabWidth: 2,
            semi: false,
            jsxSingleQuote: false,
          },
        },
      },
    },
  ],
}
