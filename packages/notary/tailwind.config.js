module.exports = {
  purge: [`./src/**/*.{js,ts,jsx,tsx}`],
  mode: `jit`,
  darkMode: false,
  theme: {
    colors: {
      black: `#363636`,
      white: `#FFFFFF`,
      sepia: `#FDDF91`,
      cream: `#FFF9E9`,
    },
    fontFamily: {
      header: [`Lora`, `sans-serif`],
      body: [`Alegreya`, `sans-serif`],
    },
    extend: {
      height: {
        screen: `var(--full-height)`,
      },
      spacing: {
        128: `32rem`,
      },
      width: {
        screen: `var(--full-width)`,
      },
    },
  },
}
