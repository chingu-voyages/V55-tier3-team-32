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
    keyframes: {
        'glow-border': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 #ff990080, 0 0 8px 4px #ff9900',
          },
          '50%': {
            boxShadow: '0 0 12px 2px #ff9900cc, 0 0 16px 8px #fffbe0cc',
          },
        },
      },
      animation: {
        'glow-border': 'glow-border 1.5s infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
      height: {
        '80vh': '80vh',
      },
  } },
  plugins: [
    require('tailwind-scrollbar-hide'),

  ],
  extend: {
 
  
}

}