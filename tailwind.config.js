/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         background: '#1C1C1C',
      coffee: '#6B4F3B',
      latte: '#A1866F',
      light: '#F4F1EE',
      muted: '#2A2A2A',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
