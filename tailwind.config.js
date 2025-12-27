/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ultra-minimalist palette - almost monochrome with subtle warmth
        primary: {
          DEFAULT: '#1a1a1a',
          50: '#fafafa',
          100: '#f7f7f7',
          200: '#efefef',
          300: '#e0e0e0',
          400: '#b8b8b8',
          500: '#8a8a8a',
          600: '#5c5c5c',
          700: '#3d3d3d',
          800: '#2a2a2a',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        // Extremely subtle accent - barely there
        accent: {
          DEFAULT: '#9b8b7a', // Very muted warm gray
          light: '#b5a89a',
          dark: '#7a6d5f',
          muted: '#faf8f6',
        },
        // Off-white backgrounds
        cream: '#fcfcfc',
        sand: '#faf9f8',
        stone: '#f5f4f2',
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