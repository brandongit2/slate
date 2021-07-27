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
      colors: {
        notary: `#FDDF91`,
      },
      fontSize: {
        "2xs": `0.625rem`,
      },
      spacing: {
        128: `32rem`,
      },
    },
  },
}
