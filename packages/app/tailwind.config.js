module.exports = {
  purge: [`./src/**/*.{js,ts,jsx,tsx}`],
  mode: `jit`,
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [`Gothic A1`, `sans-serif`],
    },

    extend: {
      contrast: {
        25: `.25`,
      },
      spacing: {
        128: `32rem`,
      },
    },
  },
}
