/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D2B',
        accent: '#3671E9',
        secondary: '#2B076E',
        grey: {
          3: '#828282',
          4: '#BDBDBD',
          5: '#E0E0E0',
          6: '#F2F2F2',
        },
        green: {
          DEFAULT: '#8FFFBE',
          dark: '#6EDCB5',
        },
        red: {
          DEFAULT: '#FF7676',
          dark: '#FF325F',
        },
        cyan: '#42FFFF',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '32': '32px',
      },
    },
  },
  plugins: [],
}
