const path = require("path")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require(`postcss`),
          postcssOptions: {
            config: path.resolve(__dirname, `../postcss.config.js`),
          },
        },
      },
    },
  ],
  webpackFinal: async (config) => {
    const assetRule = config.module.rules.find(({test}) => test?.test?.(".svg"))
    assetRule.exclude = /\.svg$/

    config.module.rules.unshift({
      test: /\.svg$/,
      use: [require.resolve("@svgr/webpack")],
    })

    config.resolve.modules.push(path.resolve(__dirname, "..", "src"), "node_modules")

    config.resolve.alias = {
      ...config.resolve.alias,
      $components: path.resolve(__dirname, `../src/components`),
      $pages: path.resolve(__dirname, `../src/pages`),
      $public: path.resolve(__dirname, `../public`),
      $queries: path.resolve(__dirname, `../src/queries`),
      $relay: path.resolve(__dirname, `../src/relay`),
      $utils: path.resolve(__dirname, `../src/utils`),
    }

    return config
  },
}
