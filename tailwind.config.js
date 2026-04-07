/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#07c160', // Wechat Green / Travel Green
        secondary: '#ff9500', // Travel Orange
      }
    },
  },
  plugins: [],
}
