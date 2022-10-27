/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popin: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#ff0000",
        txt: "#fff",
      },
      backgroundColor: {
        body: "#0f0f0f",
        overlay: "rgba(0,0,0,0.4)",
      },
      transitionProperty: {
        height_bg: "height, background-color",
        top: "top, box-shadow",
      },
      spacing: {
        "header-height": "10rem",
      },
      gridTemplateColumns: {
        allMovie: "repeat(auto-fill, minmax(120px, 1fr))",
        allMovieTablet: "repeat(auto-fill, minmax(170px, 1fr))",
        allMoviePc: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      keyframes: {
        moveInBottom: {
          "0%": {
            opacity: 0,
            transform: "translateY(10rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        moveToLeft: {
          "0%": {
            opacity: 0,
            transform: "translateX(-10rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        moveInBottom: "moveInBottom ease 1s 0.75s backwards",
        moveToLeft: "moveToLeft ease 1s 0.75s backwards",
      },
      boxShadow: {
        img_poster: "0px 1px 10px 0 #757575",
        itemShadownActive: "0 0 6px #ed1c24, 0 0 12px #ed1c24",
      },
    },
  },
  plugins: [],
};
