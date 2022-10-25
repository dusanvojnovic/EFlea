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
    },
  },
  plugins: [],
};
