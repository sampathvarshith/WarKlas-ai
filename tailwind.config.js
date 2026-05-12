/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#aa3bff',
        'primary-hover': '#c084fc',
        'primary-dark': '#7b1fa2',
        'electric-blue': '#00d2ff',
        'neon-purple': '#b026ff',
        'bg-dark': '#07050f',
        'bg-card': 'rgba(20, 18, 30, 0.6)',
        'surface': 'rgba(255,255,255,0.03)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.4s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'typing': 'typing 1.5s steps(3) infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'particle': 'particle 15s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(170,59,255,0.4)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 5px rgba(170,59,255,0.1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'particle': {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(1)', opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(170,59,255,0.3), 0 0 60px rgba(170,59,255,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(170,59,255,0.6), 0 0 100px rgba(170,59,255,0.2)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(170,59,255,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,210,255,0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(176,38,255,0.1) 0px, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(170,59,255,0.2)',
        'glow': '0 0 30px rgba(170,59,255,0.3)',
        'glow-lg': '0 0 60px rgba(170,59,255,0.4)',
        'glow-blue': '0 0 30px rgba(0,210,255,0.3)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
