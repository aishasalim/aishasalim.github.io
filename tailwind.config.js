module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths as needed
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f7fafc',
        dark: '#0d1b2a',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        default: '#f7fafc',  // Light mode background
        dark: '#0d1b2a',    // Dark mode background
      }),
      textColor: theme => ({
        ...theme('colors'),
        default: '#0d1b2a',  // Light mode text color
        dark: '#f7fafc',    // Dark mode text color
      }),
    },
  },
  plugins: [],
};
