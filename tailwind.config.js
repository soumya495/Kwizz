// tailwind.config.js

module.exports = {
  content: [
    './*.{.{js,jsx,ts,tsx}',
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      blue: '#3DB2FF',
      light: '#FFEDDA',
      yellow: '#FFB830',
      red: '#FF2442',
      dark: '#0A1931',
    },
  },
  plugins: [],
};
