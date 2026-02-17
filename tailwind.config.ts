/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hizaki Brand Colors
        indigo: {
          500: '#6366F1',
          600: '#4F46E5',
        },
        slate: {
          800: '#1e293b',
          900: '#0f172a', // Main background
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        space: ['var(--font-space)'],
      },
    },
  },
  plugins: [],
};