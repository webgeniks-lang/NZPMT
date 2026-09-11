import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },

        navy: {
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        punjabi: ['Noto Sans Gurmukhi', 'Arial Unicode MS', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
