module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "new-blue": "#00B2FF",
        "flame-orange": "#FF4D00",
        "light-flame-orange": "#FF6F00",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
