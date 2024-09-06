module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./src/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#14B8A6',
        accent: '#10B981',
        neutral: {
          light: '#F3F4F6',
          dark: '#1F2937',
        },
        alert: {
          error: '#EF4444',
          warning: '#F59E0B',
        },
      },
      animation: {
        'zoom': 'zoom 20s infinite alternate',
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.2)' }, // Increased from 1.1 to 1.2
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
