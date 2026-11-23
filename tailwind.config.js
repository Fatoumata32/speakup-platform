/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4F5FF',
          100: '#EAEBFE',
          200: '#D7D8FD',
          300: '#B4B6FB',
          400: '#8C8EF6',
          500: '#645BF0',
          600: '#5452F6',
          700: '#433ADB',
          800: '#3730A3',
          900: '#2E2882',
        },
        surface: {
          bg: '#F6F7FC',
          card: '#FFFFFF',
          sidebar: '#FBFBFE',
          border: '#E8ECF4',
        },
        pastel: {
          greenBg: '#E9F9F0',
          greenIcon: '#10B981',
          purpleBg: '#F1EFFE',
          purpleIcon: '#7C3AED',
          peachBg: '#FFF4E8',
          peachIcon: '#F97316',
          blueBg: '#EBF4FF',
          blueIcon: '#3B82F6',
          pinkBg: '#FDF0F6',
          pinkIcon: '#EC4899',
          yellowBg: '#FEF8E7',
          yellowIcon: '#EAB308',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(99, 102, 241, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 30px -5px rgba(80, 80, 160, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'hover': '0 14px 34px -4px rgba(84, 82, 246, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
