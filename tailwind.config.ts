import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1440px' },
    },
    extend: {
      colors: {
        // Светлые холодные нейтрали (фон, границы, плашки)
        stone: {
          50: '#F7F8F8',
          100: '#F0F2F2',
          200: '#E3E8E7',
          300: '#D2D9D8',
          400: '#B8C2C0',
        },
        // Тёмная база — почти чёрный с холодным подтоном
        graphite: {
          50: '#F4F6F6',
          100: '#E1E7E6',
          300: '#95A1A0',
          500: '#5A6664',
          700: '#29322F',
          800: '#1A211F',
          900: '#111716',
          950: '#0B100F',
        },
        // Акцент — глубокий изумрудно-бирюзовый
        accent: {
          50: '#EAF7F4',
          100: '#CBEBE4',
          200: '#93D7C9',
          300: '#55BFAC',
          400: '#22A48F',
          500: '#0E8A76',
          600: '#0A6E5E',
          700: '#085648',
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
