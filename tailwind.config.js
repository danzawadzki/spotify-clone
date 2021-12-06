const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./shared/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      green: {
        ...colors.green,
        default: "#18D860",
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
