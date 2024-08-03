module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'move-stars': 'move-stars 200s linear infinite',
        'move-twinkle': 'move-twinkle 200s linear infinite',
      },
      colors: {
        'lavender': '#E6E6FA',
         
      },
      backgroundColor: {
        'cosmic-bg': '#070714',
      },
      keyframes: {
        'move-stars': {
          'from': { backgroundPosition: '0 0' },
          'to': { backgroundPosition: '-10000px 5000px' },
        },
        'move-twinkle': {
          'from': { backgroundPosition: '0 0' },
          'to': { backgroundPosition: '-10000px 5000px' },
        },
        twinkle: {
          'from': { backgroundPosition: '0 0' },
          'to': { backgroundPosition: '-10000px 5000px' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px theme("colors.purple.500")',
      },
    },
  },
  plugins: [],
}