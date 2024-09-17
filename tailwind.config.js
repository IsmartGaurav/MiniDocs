/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Cabin' : ['Cabin','sans-serif'],
        'Anton' : ['Anton','sans-serif']
      },
      screens: {
        'xs': {'min':'300px','max':'639px'},
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
}

