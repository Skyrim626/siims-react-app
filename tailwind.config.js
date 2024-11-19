/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
   
    fontFamily: {
      // Configure your font-families here
      sans: ['Roboto', 'sans-serif'],
      body: ['Lato', 'sans-serif']
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1200px',
      xl: '1440px'
    },
  },
  plugins: [],
}