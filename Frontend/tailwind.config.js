/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
  } },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
  extend: {
  animation: {
    'spin-slow': 'spin 10s linear infinite',
  }
}

}