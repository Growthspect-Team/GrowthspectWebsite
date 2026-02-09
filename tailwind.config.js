/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-purple": "#8825ed",
        "brand-black": "#000000",
        "brand-dark": "#0B0B0C",
        "brand-gray": "#1A1A1C",
        "brand-light": "#F4F4F4",
        "brand-purpleDim": "rgba(136, 37, 237, 0.1)",
        card: {
          DEFAULT: '#0B0B0C',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#1A1A1C',
          foreground: '#A1A1AA',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        display: ['Satoshi', 'sans-serif'],
        oldschool: ['Oldschool Grotesk', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'water-flow': 'water-flow 4s ease infinite',
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        'water-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
