const path = require("path")

module.exports = {
  stories: ["../src/**/*.story.mdx", "../src/**/*.story.@(js|jsx|ts|tsx)"],
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
      "#assets": path.resolve(__dirname, `../src/assets`),
      "#components": path.resolve(__dirname, `../src/components`),
      "#utils": path.resolve(__dirname, `../src/utils`),
    }

    return config
  },
}
