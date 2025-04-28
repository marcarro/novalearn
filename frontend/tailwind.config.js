/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#3498db',
            dark: '#2980b9',
          },
          secondary: {
            DEFAULT: '#e74c3c',
            dark: '#c0392b',
          },
        },
      },
    },
    plugins: [],
  }