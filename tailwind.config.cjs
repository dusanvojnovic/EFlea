/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#FBF3E4",
        gray: "#DFD8CA",
        green: "#105652",
        red: "#B91646",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(30rem, 1fr))",
      },
      keyframes: {
        "grow-down": {
          "0%": { transform: "scaleY(0)" },
          "80%": { transform: "scaleY(1.1)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "grow-down": "grow-down 300ms ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
