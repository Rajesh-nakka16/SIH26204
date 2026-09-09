/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b1820",
        navy: "#0e2028",
        lime: "#b6ef75",
        mint: "#83e3cb",
        cyan: "#69d5e9",
        orange: "#ff9f54",
        soft: "#c3d5d1",
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
