/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['Oswald', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#EEEEF6',
          100: '#D3D3E9',
          200: '#A7A7D3',
          300: '#7B7BBD',
          400: '#5657A0',
          DEFAULT: '#3A3B74',
          600: '#2D2E63',
          700: '#212252',
          800: '#161641',
          900: '#0B0B30',
        },
        secondary: {
          50:  '#E8F2FB',
          100: '#C6DEF5',
          200: '#8DBDEB',
          300: '#549CE1',
          400: '#3F8FD5',
          DEFAULT: '#3178BD',
          600: '#2566A8',
          700: '#1A5493',
          800: '#104279',
          900: '#063060',
        },
        accent: {
          50:  '#FDE9F1',
          100: '#FAC7DC',
          200: '#F58EB9',
          300: '#F05596',
          400: '#EC4488',
          DEFAULT: '#E73780',
          600: '#CF2A6D',
          700: '#B71D5A',
          800: '#9F1047',
          900: '#870334',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'flip': 'flip 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
