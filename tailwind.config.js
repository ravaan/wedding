/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Maximalist Forest Garden palette - from mood board
        primary: {
          DEFAULT: '#572932',
          50: '#fdf4f5',
          100: '#fce8eb',
          200: '#f9d4da',
          300: '#f3b0bb',
          400: '#ea8294',
          500: '#dc5570',
          600: '#c73656',
          700: '#a72845',
          800: '#8b243d',
          900: '#572932', // Deep burgundy from Pantone
          950: '#3a1019',
        },
        // Olivine green from mood board
        forest: {
          DEFAULT: '#6b7c5e',
          50: '#f5f7f3',
          100: '#e8ece4',
          200: '#d2daca',
          300: '#b3c2a5',
          400: '#8fa37c',
          500: '#6b7c5e', // Olivine
          600: '#556649',
          700: '#44513b',
          800: '#394332',
          900: '#31392c',
          950: '#181d15',
        },
        // Deep wine/burgundy for accents
        wine: {
          DEFAULT: '#4a1c24',
          light: '#6b2d38',
          dark: '#2d1016',
        },
        // Sage green
        sage: {
          DEFAULT: '#8a9a7b',
          light: '#a8b59c',
          dark: '#6b7c5e',
        },
        // Gold accent
        gold: {
          DEFAULT: '#C9A227',
          light: '#E8C547',
          dark: '#8B7419',
        },
        // Backgrounds
        cream: '#572932',
        ivory: '#6b2d38',
        sand: '#4a1c24',
        moss: '#3d1219',
      },
      fontFamily: {
        sans: ['Inter Tight', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
      letterSpacing: {
        tightest: '-.075em',
        widest: '.25em',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-up': 'fadeUp 1s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}