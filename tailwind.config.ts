import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          500: '#6366F1', // Your brand color
          600: '#4F46E5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        space: ['var(--font-space-grotesk)'],
      },
    },
  },
  plugins: [],
};
export default config;