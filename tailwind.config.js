/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#1a1a1a',
        'game-text': '#e0e0e0',
        'game-accent': '#8b4513',
        'game-highlight': '#d4af37',
      },
      fontFamily: {
        'game': ['"Noto Serif JP"', 'serif'],
      },
    },
  },
  plugins: [],
}
