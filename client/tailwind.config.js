/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html"],
  theme: {
    fontFamily: {
      main: ['Poppins'],
    },
    extend: {
      fontSize:{
        'main': 15,
      },
      backgroundColor: {
        'main': '#EE3131',
      },
      colors: {
        'main-100': '#EE3131',
        'main-text': '#2b3743',
      },  
      keyframes: {
        'shadow-drop-2-lr': {
          '0%': {
            transform: 'translateZ(0)',
            boxShadow: '0 0 0 0 transparent, 0 0 0 0 transparent',
          },
          '100%': {
            transform: 'translateZ(50px)',
            boxShadow: '-12px 0 20px -12px rgba(0,0,0,.35), 12px 0 20px -12px rgba(0,0,0,.35)',
          },
        },
      },
      animation: {
        'shadow-drop-2-lr': 'shadow-drop-2-lr 0.4s cubic-bezier(.25,.46,.45,.94) both',
      },
    },
  },   
  plugins: [],
}

