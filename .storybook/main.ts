const path = require('path')

module.exports = {
  framework: '@storybook/react',
  stories: ['../source/stories/*/*.story.mdx', '../source/stories/*.story.tsx'],
  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push(
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
    'storybook-addon-performance/register',
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
