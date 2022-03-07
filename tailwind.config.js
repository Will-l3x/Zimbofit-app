module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        phone: "280px",
        tablet: "560px",
      },
      colors: {
        primary: "#cc3e00",
        primary_shade: "#b43700",
        primary_tint: "#d1511a",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
