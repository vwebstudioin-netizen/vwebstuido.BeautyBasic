import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4728A',
          50: '#FCF0F3',
          100: '#F9E0E6',
          200: '#F0B8C3',
          300: '#E890A1',
          400: '#DE6880',
          500: '#D4728A',
          600: '#C5567A',
          700: '#A83E63',
          800: '#8B2A4F',
          900: '#6E1A3C',
        },
        accent: '#C9A84C',
        ivory: '#FDF6F0',
        charcoal: '#2D2D2D',
        muted: '#7A6B6B',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideInLeft: 'slideInLeft 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
