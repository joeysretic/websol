/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm cream / ivory base
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f5ecdb',
          300: '#eeddc0',
          400: '#e4c89e',
          500: '#d7ae7a',
        },
        // Sage / eucalyptus greens
        sage: {
          50: '#f4f7f4',
          100: '#e8f0e8',
          200: '#cfe0d0',
          300: '#a8c8ab',
          400: '#7daa82',
          500: '#5c8c62',
          600: '#47734d',
          700: '#3a5d40',
          800: '#304a35',
          900: '#283d2c',
        },
        // Terracotta / clay accent
        clay: {
          50: '#fbf3ef',
          100: '#f5e1d8',
          200: '#eac4b4',
          300: '#dd9f87',
          400: '#cf7e5e',
          500: '#c26848',
          600: '#a8543a',
          700: '#8a4330',
          800: '#6f3728',
          900: '#5a2e22',
        },
        // Deep charcoal for text
        ink: {
          50: '#f5f5f4',
          100: '#e7e5e4',
          200: '#d6d3d1',
          300: '#a8a29e',
          400: '#78716c',
          500: '#57534e',
          600: '#44403c',
          700: '#292524',
          800: '#1c1917',
          900: '#0c0a09',
        },
        // Soft gold for accents
        gold: {
          50: '#fdf9ed',
          100: '#faf0d4',
          200: '#f4dfa8',
          300: '#edc96d',
          400: '#e0b04a',
          500: '#c89636',
          600: '#a87a2c',
          700: '#875e25',
          800: '#6e4c22',
          900: '#5c4020',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #fdfbf7 0%, #faf6ee 50%, #f5ecdb 100%)',
        'gradient-sage': 'linear-gradient(135deg, #f4f7f4 0%, #e8f0e8 100%)',
      },
    },
  },
  plugins: [],
};
