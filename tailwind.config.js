/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pastel wedding colors - Rajasthani-Sindhi inspired
        primary: {
          50: '#fff5f7',
          100: '#ffe8ed',
          200: '#ffd6e8',  // Primary pastel pink
          300: '#ffb8d3',
          400: '#ff8ab5',
          500: '#ff5897',
          600: '#f43875',
          700: '#dc1e5a',
          800: '#b81649',
          900: '#9b1340',
        },
        secondary: {
          50: '#fffef5',
          100: '#fffce8',
          200: '#f4e4c1',  // Pastel gold/beige
          300: '#e8dcc4',
          400: '#d4c5a5',
          500: '#c0ae87',
          600: '#a8956b',
          700: '#8b7656',
          800: '#735f49',
          900: '#61503f',
        },
        accent: {
          50: '#fff8f5',
          100: '#ffefe8',
          200: '#ffddd2',
          300: '#e8a598',  // Muted coral
          400: '#d4a5a5',
          500: '#c08a8a',
          600: '#a86f6f',
          700: '#8b5757',
          800: '#734848',
          900: '#613d3d',
        },
        neutral: {
          50: '#fafafa',   // Off-white
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        success: '#b8e6d5',  // Soft mint green for RSVP
        error: '#f4a5a5',    // Soft red for errors
      },
      fontFamily: {
        // Elegant serif for headings
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        // Clean sans-serif for body
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
        // Decorative for special elements
        display: ['Dancing Script', 'Great Vibes', 'cursive'],
        // For Hindi/Devanagari text
        hindi: ['Noto Sans Devanagari', 'Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'fade-down': 'fadeDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'countdown': 'flip 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/src/assets/images/pattern.svg')",
        'hero-gradient': 'linear-gradient(135deg, #ffd6e8 0%, #f4e4c1 50%, #e8a598 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}