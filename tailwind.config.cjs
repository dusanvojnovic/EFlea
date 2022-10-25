/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-blue": "var(--color-blue)",
        "color-violet": "var(--color-violet)",
        "color-violet-light": "var(--color-violet-light)",
        "color-pinkish": "var(--color-pinkish)",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(300px, 1fr))",
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
