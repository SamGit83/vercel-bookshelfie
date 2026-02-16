module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef7f4',
          100: '#fdeee8',
          200: '#fbd5c8',
          300: '#f7b9a5',
          400: '#f09878',
          500: '#e87b55',
          600: '#d4623e',
          700: '#b24d31',
          800: '#93402a',
          900: '#7a3726',
        },
        accent: {
          50: '#faf6f1',
          100: '#f0e6d6',
          200: '#e0ccad',
          300: '#cdab7d',
          400: '#be9058',
          500: '#b07d45',
          600: '#9a663a',
          700: '#7d4f31',
          800: '#68422d',
          900: '#583828',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
        'elevated': '0 20px 40px -12px rgb(0 0 0 / 0.12)',
      },
    },
  },
  plugins: [],
}
