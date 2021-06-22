const config = require(`config`)

module.exports = {
  reactStrictMode: true,
  experimental: {
    reactRoot: `concurrent`,
  },
  env: {
    apiUrl: config.get(`api.url`),
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [`@svgr/webpack`],
    })

    return config
  },
}
