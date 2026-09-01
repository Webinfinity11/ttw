import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1560px' },
    },
    extend: {
      colors: {
        /**
         * Палитра вынесена в CSS-переменные (globals.css).
         * Это позволяет переключать тему сайта, не трогая классы:
         * `.theme-light` переопределяет те же переменные.
         */
        stone: {
          50: 'rgb(var(--s-50) / <alpha-value>)',
          100: 'rgb(var(--s-100) / <alpha-value>)',
          200: 'rgb(var(--s-200) / <alpha-value>)',
          300: 'rgb(var(--s-300) / <alpha-value>)',
          400: 'rgb(var(--s-400) / <alpha-value>)',
        },
        graphite: {
          50: 'rgb(var(--g-50) / <alpha-value>)',
          100: 'rgb(var(--g-100) / <alpha-value>)',
          300: 'rgb(var(--g-300) / <alpha-value>)',
          500: 'rgb(var(--g-500) / <alpha-value>)',
          700: 'rgb(var(--g-700) / <alpha-value>)',
          800: 'rgb(var(--g-800) / <alpha-value>)',
          900: 'rgb(var(--g-900) / <alpha-value>)',
          950: 'rgb(var(--g-950) / <alpha-value>)',
        },
        accent: {
          50: '#FBF9F4',
          100: '#F4F0E6',
          200: '#E9E4D6',
          300: '#DDD8CB',
          400: '#CFCABC',
          500: '#B9B4A6',
          600: '#8C877A',
          700: '#6E6A5F',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,16,15,0.04), 0 12px 32px -12px rgba(11,16,15,0.12)',
        lift: '0 24px 60px -24px rgba(11,16,15,0.32)',
        card: '0 1px 0 rgba(11,16,15,0.04), 0 20px 40px -28px rgba(11,16,15,0.35)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.22,.61,.36,1) both',
        'fade-in': 'fade-in .5s ease both',
        'scale-in': 'scale-in .35s cubic-bezier(.22,.61,.36,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
