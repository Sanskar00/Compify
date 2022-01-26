module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "new-blue": "#0F3864",
        "dark-new-blue": "#1F293A",
        "flame-orange": "#FF4D00",
        "light-flame-orange": "#FF6F00",
        "teal-100": "#00cdcd",
        "teal-200": "#00b3b3",
        "teal-500": "#006767",
        slate: "rgb(248 250 252)",
        "slate-900": "rgb(15 23 42)",
      },
      width: {
        128: "32rem",
      },
      height: {
        128: "32rem",
      },
      fontFamily: {
        Leto: ["Leto", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
