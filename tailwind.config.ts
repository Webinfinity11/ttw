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
        // Светлые холодные нейтрали (фон, границы, плашки)
        stone: {
          50: '#FBF9F4',
          100: '#F4F0E6',
          200: '#DDD8CB',
          300: '#CFCABC',
          400: '#A9A497',
        },
        // Тёмная база — почти чёрный с холодным подтоном
        graphite: {
          50: '#F7F5F1',
          100: '#E9E5DD',
          300: '#A9A497',
          500: '#6E6A5F',
          700: '#3A3833',
          800: '#22211E',
          900: '#161513',
          950: '#111110',
        },
        // Акцент — глубокий изумрудно-бирюзовый
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
