/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B3A5C',
          light:   '#2A5788',
          soft:    '#EBF2FA',
        },
        accent: {
          DEFAULT: '#E8943A',
          hover:   '#D07828',
        },
        surface: '#FFFFFF',
        border:  '#E2E6ED',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl:  '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 8px rgba(15, 31, 51, 0.07), 0 0 0 1px rgba(15, 31, 51, 0.04)',
        lift: '0 12px 32px rgba(15, 31, 51, 0.10), 0 4px 8px rgba(15, 31, 51, 0.05)',
      },
    },
  },
  plugins: [],
}