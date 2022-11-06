const path = require('path')

module.exports = {
  framework: '@storybook/react',
  stories: ['../stories/*.story.tsx'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    })
    return config
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-performance/register',
    'storybook-dark-mode',
    '@storybook/addon-a11y',
    'storybook-theme-css-vars',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: {
            printWidth: 80,
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
