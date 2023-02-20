module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
};
