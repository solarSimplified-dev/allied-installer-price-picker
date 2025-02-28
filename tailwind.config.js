/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F0F0EB",
        card: "#FAFAF7",
        border: "#BFBFBA",
        text: {
          primary: "#191919",
          secondary: "#262625",
          muted: "#666663",
        },
        success: "#228B22",
        error: "#BF4043",
        accent: "#CC785C",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}
